'use strict';

describe('conFusion App E2E Testing', function() {

     it('should automatically redirect to / when location hash/fragment is empty', function() {
                    browser.get('index.html');
                    expect(browser.getLocationAbsUrl()).toMatch("/");
                  });
    
});

describe('index', function() {
    beforeEach(function() {
      browser.get('index.html#/');
    });

    it('should have a title', function() {
      expect(browser.getTitle()).
        toEqual('Ristorante Con Fusion');
    });
  });

describe('menu 0 item', function() {
    beforeEach(function() {
      browser.get('index.html#/menu/0');
    });

    it('should have a name', function() {
          var name = element(by.binding('dish.name'));
          expect(name.getText()).toEqual('Uthapizza');
    });

    it('should show the number of comments as', function() {
         expect(element.all(by.repeater('comment in dish.comments')).count()).toEqual(0);

    });
     

   
 });