// @ts-nocheck
const { test, expect } = require('@playwright/test');
const { CommonMethods } = require('../utils/CommonMethods');
const { Console } = require('console');

test.describe('Test cases about: Unsubscribe user', () => {

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


    test('Unsubscribe user with success', async ({ page }) => {

        const subscribeUserURL = apiUrl + "/" + userId + "/subscription";

        body = {
            startDate: '2024-04-03',
            endDate: '2024-05-03'
        };

        const responsePost = await commonMethods.makePostRequest(subscribeUserURL, body);

        expect(responsePost.subscription).toHaveProperty('active', true);
        
        const userSubscriptionId = responsePost.subscription.subscriptionId;
        const unsubscribeUserURL = apiUrl + "/" + userId + "/subscription/" + userSubscriptionId;
        const responseDelete = await commonMethods.makeDeleteRequest(unsubscribeUserURL);

        expect(responseDelete).toBe(userSubscriptionId);

    });

    test('Unsubscribe user: Validate not find message', async ({ page }) => {

        const subscribeUserURL = apiUrl + "/" + userId + "/subscription";

        body = {
            startDate: '2024-04-03',
            endDate: '2024-05-03'
        };

        const responsePost = await commonMethods.makePostRequest(subscribeUserURL, body);

        expect(responsePost.subscription).toHaveProperty('active', true);
        
        const userSubscriptionId = responsePost.subscription.subscriptionId;
        
        const reducedString = userSubscriptionId.slice(0, -1);
        
        const unsubscribeUserURL = apiUrl + "/" + userId + "/subscription/" + reducedString;
        const responseDelete = await commonMethods.makeDeleteRequest(unsubscribeUserURL);

        expect(responseDelete).toContain("Could not find the subscription");
        expect(responseDelete).toContain('Bad Request');
    });

});