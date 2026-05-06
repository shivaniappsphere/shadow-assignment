export function processStyleThiefBatch(targets, container) {
  const styles = Array.from(targets).map(el => {
    const computed = getComputedStyle(el);

    return {
      text: el.textContent,
      fontSize: computed.fontSize,
      color: computed.color,
      borderRadius: computed.borderRadius
    };
  });

  return new Promise(resolve => {
    requestAnimationFrame(() => {
      const fragment = document.createDocumentFragment();
      const created = [];

      styles.forEach((style) => {
        const div = document.createElement('div');

        div.textContent = `Copy: ${style.text}`;
        div.style.fontSize = style.fontSize;
        div.style.color = style.color;
        div.style.borderRadius = style.borderRadius;

        fragment.appendChild(div);
        created.push(div);
      });

      container.innerHTML = '';
      container.appendChild(fragment);

      // animation
      created.forEach((el, i) => {
        setTimeout(() => {
          el.classList.add('show');
          el.classList.add('highlight');

          setTimeout(() => {
            el.classList.remove('highlight');
          }, 800);

        }, i * 120);
      });

      resolve();
    });
  });
}