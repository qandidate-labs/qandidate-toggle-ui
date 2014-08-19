'use strict';

describe('toggle-ui', function() {

  beforeEach(function() {
    browser().navigateTo('/app/index-e2e.html');
  });

  it('should show the two initial toggles', function(){
      expect(element('tbody.toggle').count()).toEqual(2);
  });

  it('should remove a deleted toggle', function(){
      expect(element('tbody.toggle').count()).toEqual(2);
      element('tbody.toggle:first .delete').click();
      expect(element('tbody.toggle').count()).toEqual(1);
  });
});
