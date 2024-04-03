// @ts-nocheck
const { test, expect } = require('@playwright/test');
const { CommonMethods } = require('../utils/CommonMethods');

test.describe('Test cases about: Get user and Validate information', () => {

    const commonMethods = new CommonMethods();
    const apiUrl = process.env.ABI_API_USER;
    let userId = "TBD";
    let body = "TBD";
    let randomFirstName = "TBD";
    let randomLastName = "TBD";
    let randomUniqueId = "TBD";

    test.beforeEach('Common Test Setup', async ({ page }) => {
        // create user
        randomFirstName = await commonMethods.generateRandomString();
        randomLastName = await commonMethods.generateRandomString();
        randomUniqueId = await commonMethods.generateRandomString();
        let email = await commonMethods.generateRandomString();
        email = email + "@test.com";

        body = {
            age: 35,
            dateOfBirth: '1988-08-21',
            firstName: randomFirstName,
            lastName: randomLastName,
            gender: 'male',
            language: 'es',
            country: 'es',
            location: 'es',
            origin: 'br',
            physicianCountry: 'es',
            privacyAt: true,
            subscriptionStartDate: '2021-11-17',
            subscriptionEndDate: '2022-05-31',
            uniqueId: randomUniqueId,
            termsAt: true,
            productName: 'Free trial',
            email: email
        };

        const response = await commonMethods.makePostRequest(apiUrl, body);

        expect(response).toHaveProperty('userStatus', 'processing');

        userId = response.id;
    });


    test('Validate user information', async ({ page }) => {

        const updateUserURL = apiUrl + "/" + userId;

        const response = await commonMethods.makeGetRequest(updateUserURL);

        expect(response).toHaveProperty('firstName', randomFirstName);
        expect(response).toHaveProperty('origin', 'br');
        expect(response).toHaveProperty('gender', 'male');
        expect(response).toHaveProperty('location', 'es');
        expect(response).toHaveProperty('uniqueId', randomUniqueId);

    });

});