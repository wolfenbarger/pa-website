var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var app = require('../../index.js');
var http = require('http');
var server; 

describe('Protractor + Selenium Browser Tests', function() {
    before(function() { 
        browser.ignoreSynchronization = true;
        server = http.createServer(app); 
        server.listen(0);
        //browser.baseUrl = browser.baseUrl.slice(0,-1);
        console.log(browser.baseUrl);
        console.log(app.get('port'));
    }); 

    after(function(){
        server.close(); 
    });

    describe('Testing framework, Protractor, Selenium', function () {

        it('should pass', function() {
            expect(true).to.equal(true);
        });
        
        it('should expose the correct global variables', function() {
            expect(protractor).to.exist;
            expect(browser).to.exist;
            expect(by).to.exist;
            expect(element).to.exist;
            expect($).to.exist;
        });
        
        it('should go to google.com and make sure the title is Google', function(done) {
            browser.get('http://google.com');
            expect(browser.getTitle()).to.eventually.eq('Google');
            done();
        });

    });

    

    describe('Unauthenticated use cases.', function () {

        it('should successfully navigate to each page', function () {
            browser.get('/');
            expect(element(by.id('google-login'))).to.exist;
            expect(element(by.id('facebook-login'))).to.exist;
            expect(browser.getCurrentUrl()).to.eventually.equal(browser.baseUrl + '/');
            browser.findElement(by.id('home-button')).click();
            expect(browser.getCurrentUrl()).to.eventually.equal(browser.baseUrl + '/');
        });

    });


    /*
    it('should login, logout, login, and logout with Facebook', function(done) {
        
        this.slow(4000);

        browser.get('/');
        browser.findElement(by.id('facebook-login')).click()

        browser.findElement(by.id('email')).sendKeys(process.env.FACEBOOK_TEST_EMAIL);
        browser.findElement(by.id('pass')).sendKeys(process.env.FACEBOOK_TEST_PASSWORD);
        browser.findElement(by.id('u_0_2')).click();

        browser.sleep(1000);

        element(by.name('__CONFIRM__')).isPresent().then(function(result) {
            if ( result ) {
                browser.findElement(by.name('__CONFIRM__')).click();
                browser.sleep(1000);
            }
        });
        var waitLoading = by.id('logout');
        browser.wait(function() {
            return element(waitLoading).isPresent()
        }, 3000);

        browser.findElement(by.id('logout')).click();

        browser.findElement(by.id('facebook-login')).click();

        browser.findElement(by.id('logout')).click();


        // we're about to authorize some permissions, but the button isn't enabled for a second
        //fbLoginButton.driver.sleep(1500);
        //console.log(fbLoginButton.getText());
        
        done();

        //expect(browser.getTitle()).to.eventually.equal('My AngularJS App');
    });
    */
    
});





















