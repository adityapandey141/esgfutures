/**
 * Format plain text content into structured HTML
 * Handles headings, paragraphs, and bullet points
 */
export function formatReportContent(content) {
  if (!content) return '<p>Content coming soon...</p>';

  // Split content into lines
  const lines = content.split('\n').map(line => line.trim());
  let html = '';
  let inList = false;

  lines.forEach((line, index) => {
    // Skip empty lines
    if (!line) {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      return;
    }

    // Check for headings (lines that are short and followed by content)
    const nextLine = lines[index + 1];
    const isHeading = line.length < 60 && 
                     !line.startsWith('•') && 
                     !line.startsWith('-') &&
                     !line.match(/^[A-Z][a-z]+:/) &&
                     nextLine && 
                     nextLine.length > 0;

    // Bullet points
    if (line.startsWith('•') || line.startsWith('-')) {
      if (!inList) {
        html += '<ul class="list-disc list-inside space-y-2 my-4 ml-4">';
        inList = true;
      }
      const text = line.replace(/^[•-]\s*/, '');
      html += `<li class="text-neutral-700 leading-relaxed">${text}</li>`;
    }
    // Headings
    else if (isHeading && index > 0) {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      html += `<h2 class="text-2xl font-bold text-neutral-900 mt-8 mb-4">${line}</h2>`;
    }
    // Subheadings (shorter, all caps, or ending with colon)
    else if (line.length < 40 && (line === line.toUpperCase() || line.endsWith(':'))) {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      html += `<h3 class="text-xl font-semibold text-neutral-900 mt-6 mb-3">${line}</h3>`;
    }
    // Regular paragraphs
    else {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      html += `<p class="text-neutral-700 leading-relaxed mb-4">${line}</p>`;
    }
  });

  // Close any open list
  if (inList) {
    html += '</ul>';
  }

  return html;
}
