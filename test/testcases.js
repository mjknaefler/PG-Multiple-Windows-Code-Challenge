const { expect } = require("chai");
describe('Test case to understand how to handle mutliple windows when interacting with web elements', async () => {
    it('Verify user can open multiple links from facebook homepage', async () => {
        /**
         * 1. Launch facebook.com  
         * 2. Click Meta Pay
         * 3. Click Oculus
         * 4. Click Instagram
         * 5. Click Portal
         * 6. Close all tabs except Instagram
         * 7. Click 'sign up' on Instagram
         * 8. Verify "Have an account? Log in" is displayed
         */

        //1. Launch facebook.com  
        await browser.url('https://facebook.com/');

        //2. Click Meta Pay
        await $('=Meta Pay').click();

        //3. Click Oculus
        //Oculus is no longer displayed on facebook.com

        //4. Click Instagram
        await $('=Instagram').click();

        //5. Click Portal
        //Portal is no longer displayed on facebook.com

        //6. Close all tabs except Instagram
        await browser.pause(3000);
        const allHandles = await browser.getWindowHandles();
        for (handle of allHandles){
            await browser.switchToWindow(handle);
            const browserTitle = await browser.getTitle();
            if(browserTitle !== "Instagram"){
                await browser.closeWindow();
            }
        }
        await browser.switchWindow('instagram.com');
        await browser.pause(3000);

        //7. Click 'sign up' on Instagram
        await $('=Sign up').click();
        await browser.pause(3000);

        //8. Verify "Have an account? Log in" is displayed
        const haveAnAccountElement = await $('//p[text()="Have an account? "]');
        expect (await haveAnAccountElement.isDisplayed(),"'Have an account, Log In' element is not displayed").to.be.true;
        await browser.pause(3000);
    })
})