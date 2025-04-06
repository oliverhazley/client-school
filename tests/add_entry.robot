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
