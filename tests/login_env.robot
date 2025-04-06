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

