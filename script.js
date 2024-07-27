function updateAllDOMNodes() {
  const allNodes = [];
  let updatedNodesCount = 0;

  function traverse(node) {
    allNodes.push(node);
    for (let i = 0; i < node.childNodes.length; i++) {
      traverse(node.childNodes[i]);
    }
  }

  traverse(document);

  allNodes.forEach(node => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      node.setAttribute('data-changed', 'true');

      const tagName = node.tagName.toLowerCase();
      if ((tagName === 'span' || 'p' || /^h[1-6]$/.test(tagName)) && node.textContent.trim()) {
        node.childNodes.forEach(child => {
          if (child.nodeType === Node.TEXT_NODE && child.textContent.trim()) {
            child.textContent = 'MODIFICATED TEXT';
          }
        });
      }

      updatedNodesCount++;
    }
  });

  return updatedNodesCount;
}

document.getElementById('add-nodes').addEventListener('click', () => {
  const contentDiv = document.getElementById('content');
  const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  function createParagraphWithSpans(text) {
    const paragraph = document.createElement('p');
    const words = text.split(' ');
    words.forEach(word => {
      const span = document.createElement('span');
      span.textContent = word + ' ';
      paragraph.appendChild(span);
    });
    return paragraph;
  }

  for (let i = 1; i <= 3; i++) {
    const heading = document.createElement(`h${i}`);
    heading.textContent = 'Title';
    contentDiv.appendChild(heading);

    const paragraph = createParagraphWithSpans(loremIpsum);
    contentDiv.appendChild(paragraph);
  }
});

document.getElementById('modificate-dom').addEventListener('click', () => {
  const startTime = performance.now();
  const updatedNodesCount = updateAllDOMNodes();
  const endTime = performance.now();
  console.log(`Time taken to update ${updatedNodesCount} DOM nodes: ${endTime - startTime} milliseconds`);
});
