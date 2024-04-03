// @ts-nocheck
const { test, expect } = require('@playwright/test');

test.describe('Test Cases about: Wall Page', () => {

    // Add a new test case for the POST request
    test.skip('Perform a POST request', async ({ page }) => {
        // Define the URL endpoint for the POST request
        const url = 'https://client-test-api.abi.ai/user';

        // Define the data to be sent in the POST request
        const postBody = {
            language: 'es',
            physicianCountry: 'es'
        };

        // Perform the POST request
        const response = await page.evaluate(async ({ url, postBody }) => {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': '0797c976ee133afe6e4f6eb124da3ca3'
                },
                body: JSON.stringify(postBody)
            });

            return response.json();
        }, { url, postBody });

        // Optionally, you can log the response
        console.log('POST Response:', response);
        expect(response).toHaveProperty('partnerName', 'Tech Test 2022');
        
    });



    test.skip('Reproduzindo uma chamada CURL em Playwright', async ({ page }) => {
        // Define a chamada CURL como uma string
        const curlCommand = `
            curl https://client-test-api.abi.ai/user \
            -H "x-api-key: 0797c976ee133afe6e4f6eb124da3ca3" \
            -d language="es" \
            -d physicianCountry="es"
        `;
    
        // Função para executar a chamada CURL
        function executeCurlCommand(curlCommand) {
            try {
                // Executa a chamada CURL e captura a saída
                const output = execSync(curlCommand, { encoding: 'utf-8' });
                // Retorna a saída (resposta da API)
                return JSON.parse(output);
            } catch (error) {
                // Retorna um objeto de erro se a chamada CURL falhar
                return { error: error.message };
            }
        }
    
        // Executa a chamada CURL fora de page.evaluate
        const response = executeCurlCommand(curlCommand);
    
        // Imprime a resposta da chamada CURL
        console.log('Resposta da chamada CURL:', response);
    
        // Verifica se a resposta da API está correta
        expect(response.statusCode).toBe(200); // Verifica se o status da resposta é 200 OK
        expect(response.error).toBeFalsy(); // Verifica se não há erros
        // Você pode adicionar mais verificações conforme necessário, dependendo da estrutura da resposta da API
    });
  
});
