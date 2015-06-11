// For flagging components e.g. selected tab

angular.module('GpsKovetoApp')

.controller('FlaggingController', function()
{
  this.flag = 1;

  this.setFlag = function(newFlag)
  {
    this.flag = newFlag;
  };

  this.isFlagSet = function(flagToTest)
  {
    return this.flag === flagToTest;
  };
});
