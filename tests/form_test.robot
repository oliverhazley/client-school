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
