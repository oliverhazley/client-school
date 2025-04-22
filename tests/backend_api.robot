*** Settings ***
Library           RequestsLibrary
Library           DateTime
Library           Collections
Variables         ../variables/credentials.py

Suite Setup       Setup API
Suite Teardown    Delete All Sessions

*** Variables ***
${BASE}           https://healthserver-fucqceehg7e2e4ef.swedencentral-01.azurewebsites.net/api
${TOKEN}          ${EMPTY}
${ENTRY_ID}       ${EMPTY}
${WATER_ID}       ${EMPTY}

*** Keywords ***
Setup API
    Create Session    api    ${BASE}
    Authenticate As Admin

Authenticate As Admin
    ${body}=    Create Dictionary    username=admin    password=admin123
    ${resp}=    POST On Session      api    /auth/login    json=${body}
    Should Be Equal As Integers    ${resp.status_code}    200
    ${t}=       Set Variable         ${resp.json()['token']}
    Set Suite Variable    ${TOKEN}    ${t}

*** Test Cases ***
Get All Users
    ${headers}=    Create Dictionary    Authorization=Bearer ${TOKEN}
    ${resp}=       GET On Session       api    /users    headers=${headers}
    Should Be Equal As Integers    ${resp.status_code}    200
    ${users}=     Set Variable        ${resp.json()}
    Should Not Be Empty    ${users}

Create Diary Entry
    ${today}=     Get Current Date    result_format=%Y-%m-%d
    ${entry}=     Create Dictionary   entry_date=${today}    mood=5    weight=70    sleep_hours=7    notes=API Robot entry
    ${headers}=   Create Dictionary   Authorization=Bearer ${TOKEN}
    ${resp}=      POST On Session     api    /entries    json=${entry}    headers=${headers}
    Should Be Equal As Integers    ${resp.status_code}    201
    ${id}=        Set Variable        ${resp.json()['entry_id']}
    Set Suite Variable    ${ENTRY_ID}    ${id}

Get Diary Entries
    ${headers}=    Create Dictionary    Authorization=Bearer ${TOKEN}
    ${resp}=       GET On Session       api    /entries    headers=${headers}
    Should Be Equal As Integers    ${resp.status_code}    200
    Should Contain    ${resp.text}    "entry_id":${ENTRY_ID}

Create Water Log
    ${today}=     Get Current Date    result_format=%Y-%m-%d
    ${water}=     Create Dictionary   consumption_date=${today}    cups=3
    ${headers}=   Create Dictionary   Authorization=Bearer ${TOKEN}
    ${resp}=      POST On Session     api    /water      json=${water}    headers=${headers}
    Should Be Equal As Integers    ${resp.status_code}    201
    ${wid}=       Set Variable        ${resp.json()['water_id']}
    Set Suite Variable    ${WATER_ID}    ${wid}

Get Water Logs
    ${headers}=    Create Dictionary    Authorization=Bearer ${TOKEN}
    ${resp}=       GET On Session       api    /water    headers=${headers}
    Should Be Equal As Integers    ${resp.status_code}    200
    Should Contain    ${resp.text}    "water_id":${WATER_ID}

List Exercises
    ${headers}=    Create Dictionary    Authorization=Bearer ${TOKEN}
    ${resp}=       GET On Session       api    /exercises    headers=${headers}
    Should Be Equal As Integers    ${resp.status_code}    200
    ${exs}=        Set Variable        ${resp.json()}
    Should Not Be Empty    ${exs}
