angular.module('shoppingListModule.controllers',[]).controller('ShoppingListController',['$scope', function($scope){
  console.log("ShoppingListController");

/* shopping list grid */
  $scope.gridOptions = {
    enableRowSelection: true,
    enableSelectAll: true,
    selectionRowHeaderWidth: 35,
    multiSelect: true,
    enableCellEditOnFocus: true,
    columnDefs: [
      { name: 'item', enableCellEditOnFocus: false, width: 150},
      { name: 'price', enableCellEdit: true, width: 70},
      { name: 'note', enableCellEdit: true}
  ]};


/* for test
  var listData = [{
    "item": "fish",
    "price": "100",
    "note": "buy for dudu"
  },{
    "item": "vegitables",
    "price": "1000",
    "note": ""
  },{
    "item": "Jolin",
    "price": "10000",
    "note": "not for sale"
  },{
    "item": "RT coupon",
    "price": "",
    "note": "very good",
  }];

  $scope.gridOptions.data = listData;
*/

  //// functions ////
  $scope.addItem = function(){
    $scope.gridOptions.data.push({
      "item": $scope.newItem.name,
      "price": $scope.newItem.price,
      "note": $scope.newItem.note,
    });

    saveDataLocal("localListGridData",$scope.gridOptions.data);
    $scope.newItem = undefined;
  }

  //edit list setting
  $scope.editList = function(){
    var listData = [{
      "listName": $scope.listData.listName,
      "date": $scope.listData.date,
      "store": $scope.listData.store,
      "budget": $scope.listData.budget,
      "note": $scope.listData.note,
    }];
  
    saveDataLocal("localListData",listData);
  };

  //get data from local storage
  // dataKey:
  // localListGridData      grid data of shopping list
  // localListData          setting of shopping list
  var getDataLocal = function(dataKey){
    return JSON.parse(localStorage.getItem(dataKey));
  }

  //save data to local storage
  // dataKey:
  // localListGridData      grid data of shopping list
  // localListData          setting of shopping list
  var saveDataLocal = function(dataKey,data){
    localStorage.setItem(dataKey, JSON.stringify(data));
  }

  var getTotalAmount = function(newValue){
    var totalAmount = 0;
    for(i=0;newValue.length;i++){
      if(typeof newValue[i] !== 'undefined'){
        if(newValue[i].price !== ""){
          totalAmount = totalAmount + parseInt(newValue[i].price);
        }
      }else{
        break;
      }
    }
    return totalAmount;
  };

  var getDifference = function(){
    return parseInt($scope.listData.budget) - parseInt($scope.totalAmount);
  };

  //// end of functions ////
    

  // initial
  //0. check grid data in server
  //1. yes, update it to local storage

  //2. no, create empty list

  //3. no http connection, work on local storage
  //3.1. check if grid data exists in local storage
  var localListGridData = getDataLocal("localListGridData");

  if(localListGridData){
    $scope.gridOptions.data = localListGridData;
  }else{
    //3.1.1 no, create empty list
    $scope.gridOptions.data = [];
  }

  //// list setting ////
  var listData = getDataLocal("localListData");

  if(listData){
    $scope.listData = listData[0];
  }

  //operations when grid data is updated
  $scope.$watch('gridOptions.data',function(newValue){
    $scope.totalAmount = getTotalAmount(newValue);
    $scope.difference = getDifference(); 
  },true);

  $scope.$watch('listData',function(newValue){
    $scope.difference = getDifference(); 
  },true);

  
}]);


