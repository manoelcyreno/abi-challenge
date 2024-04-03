// @ts-nocheck
const { test, expect } = require('@playwright/test');
const { CommonMethods } = require('../utils/CommonMethods');

test.describe('Test cases about: Create user', () => {

    const commonMethods = new CommonMethods();
    const apiUrl = process.env.ABI_API_USER;

    test('Create a valid user', async ({ page }) => {

        const randomFirstName = await commonMethods.generateRandomString();
        const randomLastName = await commonMethods.generateRandomString();
        const randomUniqueId = await commonMethods.generateRandomString();
        let email = await commonMethods.generateRandomString();
        email = email + "@test.com";

        const postBody = {
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

        const response = await commonMethods.makePostRequest(apiUrl, postBody);

        expect(response).toHaveProperty('userStatus', 'processing');

    });

    test('Create duplated users is not possible', async ({ page }) => {

        const randomFirstName = await commonMethods.generateRandomString();
        const randomLastName = await commonMethods.generateRandomString();
        const randomUniqueId = await commonMethods.generateRandomString();
        let email = await commonMethods.generateRandomString();
        email = email + "@test.com"

        const postBody = {
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

        const response1 = await commonMethods.makePostRequest(apiUrl, postBody);

        expect(response1).toHaveProperty('userStatus', 'processing');

        const response2 = await commonMethods.makePostRequest(apiUrl, postBody);

        expect(response2).toHaveProperty('name', 'Conflict');
        expect(response2).toHaveProperty('message', 'User already exists!');

    });

    test('Validate required fields: language missing', async ({ page }) => {

        const postBody = {
            physicianCountry: 'es'
        };

        const response = await commonMethods.makePostRequest(apiUrl, postBody);

        let isEmptyError = false;
        let isNotStringError = false;
        if (response.message && Array.isArray(response.message)) {
            for (const messageObj of response.message) {
                if (messageObj.constraints && messageObj.constraints.isNotEmpty === "language should not be empty") {
                    isEmptyError = true;
                }
                if (messageObj.constraints && messageObj.constraints.isString === "language must be a string") {
                    isNotStringError = true;
                }
            }
        }

        expect(response).toHaveProperty('error', 'Validation failed');
        expect(isEmptyError).toBe(true);
        expect(isNotStringError).toBe(true);
    });

    test('Validate required fields: language is not a String', async ({ page }) => {

        const postBody = {
            language: 1,
            physicianCountry: 'es'
        };

        const response = await commonMethods.makePostRequest(apiUrl, postBody);

        let isEmptyError = false;
        let isNotStringError = false;
        if (response.message && Array.isArray(response.message)) {
            for (const messageObj of response.message) {
                if (messageObj.constraints && messageObj.constraints.isNotEmpty === "language should not be empty") {
                    isEmptyError = true;
                }
                if (messageObj.constraints && messageObj.constraints.isString === "language must be a string") {
                    isNotStringError = true;
                }
            }
        }

        expect(response).toHaveProperty('error', 'Validation failed');
        expect(isEmptyError).toBe(false);
        expect(isNotStringError).toBe(true);
    });

    test('Validate required fields: physicianCountry missing', async ({ page }) => {

        const postBody = {
            language: 'es'
        };

        const response = await commonMethods.makePostRequest(apiUrl, postBody);

        let isEmptyError = false;
        let isNotStringError = false;
        if (response.message && Array.isArray(response.message)) {
            for (const messageObj of response.message) {
                if (messageObj.constraints && messageObj.constraints.isNotEmpty === "physicianCountry should not be empty") {
                    isEmptyError = true;
                }
                if (messageObj.constraints && messageObj.constraints.isString === "physicianCountry must be a string") {
                    isNotStringError = true;
                }
            }
        }

        expect(response).toHaveProperty('error', 'Validation failed');
        expect(isEmptyError).toBe(true);
        expect(isNotStringError).toBe(true);
    });

    test('Validate required fields: physicianCountry is not a String', async ({ page }) => {

        const postBody = {
            language: 'es',
            physicianCountry: 1
        };

        const response = await commonMethods.makePostRequest(apiUrl, postBody);

        let isEmptyError = false;
        let isNotStringError = false;
        if (response.message && Array.isArray(response.message)) {
            for (const messageObj of response.message) {
                if (messageObj.constraints && messageObj.constraints.isNotEmpty === "physicianCountry should not be empty") {
                    isEmptyError = true;
                }
                if (messageObj.constraints && messageObj.constraints.isString === "physicianCountry must be a string") {
                    isNotStringError = true;
                }
            }
        }

        expect(response).toHaveProperty('error', 'Validation failed');
        expect(isEmptyError).toBe(false);
        expect(isNotStringError).toBe(true);
    });

});