
<hr style="height:8px; background-color:mediumslateblue; border:none;" />
<hr style="height:8px; background-color:mediumslateblue; border:none;" />

### This ReadMe is for "CheckYoSelf's Health Diary case testing. 
### ChatGPT-4o was used to help format and construct this ReadMe.

<hr style="height:8px; background-color:mediumslateblue; border:none;" />
<hr style="height:8px; background-color:mediumslateblue; border:none;" />


<br>

## Tehtävä 1 – Ympäristön valmistelu ja työkalujen asennus

Projektin kansio: `client-school`  
Käyttöjärjestelmä: **Windows**
<br>

---

### 1. Kansiorakenne

Luotiin kansiot:
- `tests/` → testitiedostoille
- `outputs/` → testien tulosteille
<br>

---

### 2. Virtuaaliympäristö

Luotiin virtuaaliympäristö ja otettiin käyttöön:

        python -m venv .venv 
        .venv\Scripts\activate

<br>

---

### 3. Asennetut työkalut

Seuraavat kirjastot asennettiin:

    pip install robotframework
    pip install robotframework-browser
    rfbrowser init
    pip install robotframework-requests
    pip install robotframework-crypto
    pip install robotframework-tidy

<br>

---

### 4. .gitignore sisältö

Lisättiin seuraavat rivit:

    .venv/ 
    .env 
    outputs/
<br>
<br>

<hr style="height:8px; background-color:mediumslateblue; border:none;" />
<hr style="height:8px; background-color:mediumslateblue; border:none;" />
<hr style="height:8px; background-color:mediumslateblue; border:none;" />



## Tehtävä 2 – Kirjautumistesti
 
Tarkoitus: Testata että käyttäjä voi kirjautua Health Diary -sovellukseen. Frontend ei käytä `name` tai `id` attribuutteja, joten käytettiin kenttien järjestystä:

- `input >> nth=0` → käyttäjänimi
- `input >> nth=1` → salasana
- `text=login` → napin tunnistus


### Testin vaiheet:

1. Avaa kirjautumissivu
2. Täyttää tunnukset
3. Klikkaa login
4. Varmistaa, että "log in" teksti katoaa (eli käyttäjä pääsi sisään)


Tiedosto: `tests/login.robot` 

    *** Settings ***
    Library    Browser
    
    *** Test Cases ***
    Login To Health Diary
        New Browser    headless=false
        New Page    https://healthdiary.netlify.app/login
        Fill Text    input >> nth=0    test1234
        Fill Text    input >> nth=1    test1234
        Click    text=login
        Wait For Elements State    text=log in    hidden    timeout=5s


 
Ajo PowerShellissa:

    robot --outputdir outputs tests/login.robot

Outcome:

[Case 2](https://github.com/oliverhazley/client-school/tree/master/outputs/Case2)

<br>

![Login test image](https://github.com/oliverhazley/client-school/blob/master/tests/test-images/logintest.PNG?raw=true)


<hr style="height:8px; background-color:mediumslateblue; border:none;" />

<hr style="height:8px; background-color:mediumslateblue; border:none;" />

<hr style="height:8px; background-color:mediumslateblue; border:none;" />

## Tehtävä 3 – Weblomakkeen testaus (Selenium Web Form)

Testattiin Seleniumin esimerkkisivun lomakekenttiä:   
https://www.selenium.dev/selenium/web/web-form.html

### Testatut kentät:
- Tekstikenttä (`my-text`)
- Salasana (`my-password`)
- Tekstialue (`my-textarea`)
- Valintalista (`my-select`)
- Checkbox (valittiin toinen: `nth=1`)
- Radiopainike (valittiin toinen: `nth=1`)
- Päivämääräkenttä (`my-date`)
- Lomakkeen lähetys

Tiedosto: `tests/form_test.robot` 

    *** Settings ***
    Library    Browser
    
    *** Test Cases ***
    Test Selenium Web Form
        New Browser    headless=false
        New Page    https://www.selenium.dev/selenium/web/web-form.html

        # Fill the text input
        Fill Text    input[name="my-text"]    Hello Robot
    
        # Fill the password field
        Fill Text    input[name="my-password"]    secret123
    
        # Fill the text area
        Fill Text    textarea[name="my-textarea"]    This is a message
    
        # Select from dropdown
        Select Options By    select[name="my-select"]    label    One
    
        # Check the second checkbox
        Check Checkbox    input[name="my-check"] >> nth=1
    
        # Click the second radio button
        Click    input[name="my-radio"] >> nth=1
    
        # Fill the date field
        Fill Text    input[name="my-date"]    2023-12-31
    
        # Submit the form
        Click    button
        Wait For Elements State    text=Form submitted    visible



Ajo PowerShellissa:

    robot --outputdir outputs tests/form_test.robot

Outcome: 

[Case 3](https://github.com/oliverhazley/client-school/tree/master/outputs/Case3)

<br>

![Login test image](https://github.com/oliverhazley/client-school/blob/master/tests/test-images/form_test.PNG?raw=true)

<hr style="height:8px; background-color:mediumslateblue; border:none;" />

<hr style="height:8px; background-color:mediumslateblue; border:none;" />

<hr style="height:8px; background-color:mediumslateblue; border:none;" />

## Tehtävä 4: Päiväkirjamerkinnän lomakkeen testaus

**Tavoite:**  
Automaattisesti testata, että käyttäjä voi täyttää ja lähettää uuden päiväkirjamerkinnän onnistuneesti sovelluksen Dashboard-näkymässä.

---

### Testin tiedot

- **Testitiedosto:** `tests/add_entry.robot`
- **Tarkoitus:** Varmistaa, että kirjautunut käyttäjä voi:
  - täyttää liukusäätimet (unet, mieliala, paino)
  - kirjoittaa tekstikenttään muistiinpanon
  - klikata “+ add entry” -painiketta
  - nähdä onnistumisilmoituksen (“Journal entry added!”)


---

### Testin kulku

1. Avaa selain ja siirry kirjautumissivulle.
2. Syötä testikäyttäjän tunnukset:
   - Käyttäjätunnus: `test1234`
   - Salasana: `test1234`
3. Kirjaudu sisään ja odota, että Dashboard latautuu.
4. Skrollaa alas kohtaan **New Journal Entry**.
5. Täytä kentät:
   - **Sleep Hours:** `7`
   - **Mood:** `5`
   - **Weight:** `70`
   - **Notes:** `Slept well and felt okay`
6. Klikkaa “+ add entry” -painiketta.
7. Odota vahvistustekstiä: `Journal entry added!`

---

### Onnistumisen kriteeri

Testi katsotaan onnistuneeksi, jos kaikki lomakekentät täyttyvät, merkintä lähetetään onnistuneesti ja vahvistusteksti näkyy sivulla.

---

Tiedosto: `tests/add_entry.robot` 

    *** Settings ***
    Library    Browser

    *** Test Cases ***
    Add New Journal Entry
        # 1) Open browser & go to login
        New Browser    headless=false
        New Page    https://healthdiary.netlify.app/login
    
        # 2) Log in
        Fill Text    input >> nth=0    test1234
        Fill Text    input >> nth=1    test1234
        Click        text=login
    
        # 3) Wait for Dashboard
        Wait For Elements State    text=New Journal Entry    visible
        Scroll To                  text=New Journal Entry
    
        # 4) Fill each range input as if it were text
        Fill Text    input[type="range"] >> nth=1    7
        Fill Text    input[type="range"] >> nth=2    5
        Fill Text    input[type="range"] >> nth=3    70
    
        # 5) Fill the notes
        Fill Text    textarea    Slept well and felt okay
    
        # 6) Click the button
        Click    text=+ add entry
    
        # 7) Confirm success
        Wait For Elements State    text=Journal entry added!    visible



 
Ajo PowerShellissa:

    robot --outputdir outputs tests/add_entry.robot

Outcome:

[Case 3](https://github.com/oliverhazley/client-school/tree/master/outputs/Case3)

<br>

![Login test image](https://github.com/oliverhazley/client-school/blob/master/tests/test-images/entry_test.PNG?raw=true)


<hr style="height:8px; background-color:mediumslateblue; border:none;" />

<hr style="height:8px; background-color:mediumslateblue; border:none;" />

<hr style="height:8px; background-color:mediumslateblue; border:none;" />

## Tehtävä 5 – Kirjautumistesti .env-tiedoston avulla

**Tavoite:**  
Toteuttaa kirjautumistesti hyödyntäen `.env`-tiedostoon piilotettuja käyttäjätunnusta ja salasanaa. Näin testissä ei tarvitse kirjoittaa tunnistetietoja näkyviin.

---

### 1. .env-tiedosto projektin juuressa

    DIARY_USERNAME=placeholder
    DIARY_PASSWORD=placeholder


> `.env` lisättiin `.gitignore`-tiedostoon, jotta se ei tallennu GitHubiin.

---

### 2. Python-tiedosto muuttujien lukemiseen

Tiedosto: `variables/credentials.py`

    import os
    from dotenv import load_dotenv
    
    load_dotenv()
    
    USERNAME = os.getenv("DIARY_USERNAME")
    PASSWORD = os.getenv("DIARY_PASSWORD")
    
    if USERNAME is None or PASSWORD is None:
        raise ValueError("Missing USERNAME or PASSWORD in .env file.")

### 3. Kirjautumistesti Robot Frameworkilla

Tiedosto: `tests/login_env.robot`

    *** Settings ***
    Library     Browser
    Variables   ../variables/credentials.py
    
    *** Test Cases ***
    Login With Env Credentials
        New Browser    headless=false
        New Page    https://healthdiary.netlify.app/login
        Fill Text    input >> nth=0    ${USERNAME}
        Fill Text    input >> nth=1    ${PASSWORD}
        Click        text=login
        Wait For Elements State    text=New Journal Entry    visible

### 5. Onnistumisen kriteeri
Testi onnistuu, jos:

- Sovellukseen kirjaudutaan ympäristömuuttujien perusteella



Ajo PowerShellissa:

    robot --outputdir outputs tests/login_env.robot

Outcome:

[Case 4](https://github.com/oliverhazley/client-school/tree/master/outputs/Case4)

<br>

![Login test image](https://github.com/oliverhazley/client-school/blob/master/tests/test-images/env_login_test.PNG?raw=true)

<hr style="height:8px; background-color:mediumslateblue; border:none;" />

<hr style="height:8px; background-color:mediumslateblue; border:none;" />

<hr style="height:8px; background-color:mediumslateblue; border:none;" />

## Tehtävä 6 – Kirjautuminen salatuilla tunnuksilla (CryptoLibrary)

**Tavoite:**  
Testata kirjautumista sovellukseen, jossa käyttäjätunnus ja salasana on **salattu** käyttäen `cryptography.fernet`-kirjastoa. Salauksen purku tehdään Python-pohjaisessa `encrypted_credentials.py` -tiedostossa.

---

### Testin tiedot

- **Testitiedosto:** `tests/login_encrypted.robot`
- **Muuttujatiedosto:** `variables/encrypted_credentials.py`
- **Kirjasto:** `cryptography`
- **Käytetty salaus:** `Fernet` (symmetrinen avain)

---

### Testin kulku

1. `encrypted_credentials.py` sisältää salatut tunnukset ja salausavaimen.
2. Testi lataa muuttujat `USERNAME` ja `PASSWORD` salauksen purun jälkeen.
3. Avaa kirjautumissivun.
4. Täyttää kirjautumistiedot ja painaa "login".
5. Odottaa, että **New Journal Entry** -otsikko ilmestyy, eli sisäänkirjautuminen onnistui.

---

### Muuttujatiedoston sisältö (`variables/encrypted_credentials.py`)

    from cryptography.fernet import Fernet

    KEY = "Sbu4DBk1y4b0hoqUjDy1dtvXFfm5292GUWD2MCyr7Qw="
    ENC_USER = "gAAAAABn8qOcJS3m37pCOgGdD3E9KNlV_IhGRzlTNo4zTtbLmRGGoqyLnjrE6vfRvDn0EJWYF4r-Um0WVFzrdnVt9cihINzBhg=="
    ENC_PASS = "gAAAAABn8qOcKAG2xBduvvEDV9Kieo27u1YsBxH3bC4i1sFthys8RfWTuVM1UdhQPy3HcZMCw42epPCVXXmN-b0dauEzim1dXg=="
    
    cipher = Fernet(KEY)
    
    USERNAME = cipher.decrypt(ENC_USER.encode()).decode()
    PASSWORD = cipher.decrypt(ENC_PASS.encode()).decode()

### Testitiedoston sisältö (`tests/login_encrypted.robot`)

    *** Settings ***
    Library    Browser
    Variables  ../variables/encrypted_credentials.py
    
    *** Test Cases ***
    Login With Encrypted Credentials
        New Browser    headless=false
        New Page    https://healthdiary.netlify.app/login
        Fill Text    input >> nth=0    ${USERNAME}
        Fill Text    input >> nth=1    ${PASSWORD}
        Click        text=login
        Wait For Elements State    text=New Journal Entry    visible

### .gitignore
Tiedostoon `.gitignore` lisättiin:

    variables/encrypted_credentials.py

Ajo PowerShellissa:

    robot --outputdir outputs tests/login_env.robot

Outcome:

[Case 5](https://github.com/oliverhazley/client-school/tree/master/outputs/Case5)

<br>

![Login test image](https://github.com/oliverhazley/client-school/blob/master/tests/test-images/encrypt_login.PNG?raw=true)



<hr style="height:8px; background-color:mediumslateblue; border:none;" />

<hr style="height:8px; background-color:mediumslateblue; border:none;" />

<hr style="height:8px; background-color:mediumslateblue; border:none;" />
