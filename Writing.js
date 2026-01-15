document.addEventListener("DOMContentLoaded", () => {
  // On vise les éléments qui contiennent du texte (toute la page)
  // Select main textual elements but exclude anchors and nav/footer content
  const selector = [".logo", "h1", "h2", "h3", "p", "label", "button"].join(
    ","
  );

  const elements = Array.from(document.querySelectorAll(selector))
    // exclude anything inside <nav> or <footer> so links and navigation stay instant
    .filter((el) => !el.closest("nav") && !el.closest("footer"));

  // On garde uniquement les éléments qui ont du texte
  const items = elements
    .map((el) => ({
      el,
      text: (el.textContent || "").replace(/\s+/g, " ").trim(),
    }))
    .filter((item) => item.text.length > 0);

  // On vide tous les textes au départ
  for (const item of items) {
    item.el.textContent = "";
  }

  // Réglages
  const baseSpeed = 18; // vitesse moyenne
  const punctuationPause = 180; // pause après . , ! ? etc
  const betweenElementsPause = 120;

  let index = 0;

  function typeNextElement() {
    if (index >= items.length) return;

    const { el, text } = items[index];
    el.classList.add("typing-active");

    let i = 0;

    function typeChar() {
      if (i >= text.length) {
        el.classList.remove("typing-active");
        index++;
        setTimeout(typeNextElement, betweenElementsPause);
        return;
      }

      const ch = text[i];
      el.textContent += ch;
      i++;

      let delay = baseSpeed + Math.floor(Math.random() * 25);
      if (/[.!?;:]/.test(ch)) delay += punctuationPause;

      setTimeout(typeChar, delay);
    }

    typeChar();
  }

  typeNextElement();
});
