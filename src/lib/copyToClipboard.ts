export async function copyToClipboard(text: string) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      console.log("Text copied to clipboard");
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand("copy");
        console.log("Text copied to clipboard using execCommand");
      } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
      }
      document.body.removeChild(textarea);
    }
  } catch (err) {
    console.error("Could not copy text:", err);
  }
}
