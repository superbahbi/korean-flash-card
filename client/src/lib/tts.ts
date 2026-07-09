/**
 * Web Speech API wrapper for Korean TTS
 */

export function speakKorean(text: string) {
  if (!window.speechSynthesis) {
    console.error("Speech synthesis not supported");
    return;
  }

  // Stop any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ko-KR";
  utterance.rate = 0.9; // Slightly slower for clarity
  utterance.pitch = 1.0;

  // Find a Korean voice if available
  const voices = window.speechSynthesis.getVoices();
  const koreanVoice = voices.find((v) => v.lang.startsWith("ko"));
  if (koreanVoice) {
    utterance.voice = koreanVoice;
  }

  window.speechSynthesis.speak(utterance);
}

/**
 * Clean Korean text from front string (remove romanization)
 */
export function cleanKoreanText(text: string): string {
  // Matches Korean characters and common punctuation, excluding the (romanization) part
  const match = text.match(/^([^\(]+)/);
  return match ? match[1].trim() : text.trim();
}
