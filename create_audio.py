# create_audio.py
from gtts import gTTS
import os

print("Attempting to create audio file...")
audio_dir = os.path.join('static', 'audio')
os.makedirs(audio_dir, exist_ok=True)
print(f"Directory '{audio_dir}' ensured.")

text = """
Namaste Rajesh ji! Main HERA hun, aapki Hero Splendor ki swasthya sahayak. 
Kya aap 2 minute baat kar sakte hain? 
Humne dekha ki aapke brake pads tez ghis rahe hain barish ke mausam ki wajah se. 
Agle aath din mein service zaroori hai braking performance ke liye. 
Hamare analysis ke mutabik aath din safe hain. 
Hero World Andheri mein is Thursday dopahar do baje express slot available hai, 
sirf pachaas minute lagega. 
Is hafte pandrah percent discount bhi hai brake service par. 
Kya main book kar dun? 
Bahut achha! Aapka booking confirm hai chaubis October do baje par Hero World Andheri. 
SMS aur reminder bhi aayega. 
Brake pads already order kar diye hain. 
Surakshit chalayein!
"""

output_path = os.path.join(audio_dir, 'hera_call_demo.mp3')
try:
    print("Generating audio...")
    tts = gTTS(text=text, lang='hi', slow=False)
    tts.save(output_path)
    print(f"Audio file created: {output_path}")
except Exception as e:
    print(f"Error: {e}")
