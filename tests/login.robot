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
