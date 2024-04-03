// @ts-nocheck
const { test, expect } = require('@playwright/test');
const { CommonMethods } = require('../utils/CommonMethods');

test.describe('Test cases about: Update user', () => {

    const commonMethods = new CommonMethods();
    const apiUrl = process.env.ABI_API_USER;
    let userId = "TBD";
    let body = "TBD";

    test.beforeEach('Common Test Setup', async ({ page }) => {
        // create user
        const randomFirstName = await commonMethods.generateRandomString();
        const randomLastName = await commonMethods.generateRandomString();
        const randomUniqueId = await commonMethods.generateRandomString();

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
            productName: 'Free trial'
        };

        const response = await commonMethods.makePostRequest(apiUrl, body);

        expect(response).toHaveProperty('userStatus', 'processing');

        userId = response.id;
    });


    test('Update user with success', async ({ page }) => {

        const updateUserURL = apiUrl + "/" + userId;

        body = {
            age: 20,
            origin: 'es' 
        };

        const response = await commonMethods.makePutRequest(updateUserURL, body);

        expect(response).toHaveProperty('userStatus', 'pendingActivation');

    });

    test('Update user: Duplicated field', async ({ page }) => {

        const updateUserURL = apiUrl + "/" + userId;

        body = {
            gender: [ 'male', 'female' ]
        };

        const response = await commonMethods.makePutRequest(updateUserURL, body);

        expect(response).toHaveProperty('error', 'Bad Request');
        expect(response).toHaveProperty('statusCode', 400);

    });

});