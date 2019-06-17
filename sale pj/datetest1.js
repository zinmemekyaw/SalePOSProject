var dataDates = [{
    "date": "Nov 28, 2017",
    "name": "Samuel A. Kidd",
    "email": "dui.nec@sapienimperdietornare.ca",
    "address": "944-343 Nec Avenue"
  },
  {
    "date": "May 20, 2015",
    "name": "Jenna R. Alston",
    "email": "semper.auctor.Mauris@acrisus.edu",
    "address": "5316 Mollis Av."
  },
  {
    "date": "Mar 11, 2018",
    "name": "Magee K. Mcfarland",
    "email": "Maecenas@egetmollis.co.uk",
    "address": "Ap #605-1298 Id Rd."
  },
  {
    "date": "Dec 9, 2016",
    "name": "Claudia V. Campbell",
    "email": "Donec@semegestas.ca",
    "address": "Ap #935-7909 Lectus Rd."
  },
  {
    "date": "Aug 4, 2015",
    "name": "Steven V. Reynolds",
    "email": "est.ac@ut.net",
    "address": "Ap #501-8119 Vel, Rd."
  },
  {
    "date": "Mar 25, 2019",
    "name": "Amy O. Bean",
    "email": "risus.quis.diam@adipiscingelitEtiam.org",
    "address": "1855 Euismod Ave"
  },
  {
    "date": "Jan 12, 2019",
    "name": "Quintessa H. Clay",
    "email": "arcu.Sed.eu@variusNam.net",
    "address": "P.O. Box 127, 812 Lobortis Rd."
  },
  {
    "date": "Feb 7, 2015",
    "name": "Marvin P. Golden",
    "email": "pellentesque@lobortistellusjusto.org",
    "address": "P.O. Box 936, 8921 Augue Av."
  },
  {
    "date": "Aug 4, 2015",
    "name": "Shay Z. Clayton",
    "email": "sem.egestas@maurisidsapien.org",
    "address": "5862 Pede St."
  },
  {
    "date": "Feb 12, 2015",
    "name": "Jin G. Jimenez",
    "email": "dictum.magna@parturientmontes.org",
    "address": "4310 Malesuada Av."
  },
  {
    "date": "Feb 10, 2017",
    "name": "Dawn R. Blackwell",
    "email": "risus.varius.orci@ipsumdolor.com",
    "address": "5585 Metus. St."
  },
  {
    "date": "Apr 28, 2015",
    "name": "Audra A. Gates",
    "email": "consectetuer.adipiscing@libero.ca",
    "address": "448-332 Iaculis Ave"
  },
  {
    "date": "May 6, 2018",
    "name": "Gloria K. Dodson",
    "email": "mauris.Integer.sem@purusinmolestie.co.uk",
    "address": "564-3879 Vel, St."
  },
  {
    "date": "Jan 1, 2015",
    "name": "Inga I. Vinson",
    "email": "Donec@enimnec.net",
    "address": "320-4632 Lacus. Road"
  },
  {
    "date": "Jul 21, 2015",
    "name": "Berk M. Owen",
    "email": "eros@mi.co.uk",
    "address": "727 Bibendum Ave"
  },
  {
    "date": "Feb 27, 2016",
    "name": "Jessica C. Thompson",
    "email": "Donec@anteNunc.com",
    "address": "P.O. Box 903, 2394 A, St."
  }
];



$(document).ready(function() {

  $('.datepicker').datepicker(); //Activates the datepicker Materialize CSS element

  preview_json(dataDates, $("#view_rawData")); //show the original data on the screen
  $("#count_RawData").html("(" + dataDates.length + ")");

  $("#filter-button").click(function(e) {

    console.log("Hello world");

    //Gets the form data in a unified manner
    var getFormData = {
      dates: {
        start: $("#date_from").val(),
        end: $("#date_to").val()
      }
    };

    //Function to filter the result
    var filteredData = dateFilterer(dataDates, getFormData.dates.start, getFormData.dates.end);
    preview_json(filteredData.finalValues, $("#view_filteredData")); //show the final result on the screen
    $("#count_FilteredData").html("(" + filteredData.finalValues.length + ")");

  });


});


//Filter function to ensure that the final result set is within a particular range
function dateFilterer(sourceValues, startDate, endDate) {

  /*Curtosy of the tutorial found here: https://www.w3schools.com/jsref/jsref_filter.asp*/
  function filterFunction_dates(sourceValue) {

    //Aim: To test if the tested date is valid within a particular range
    var rangeAcceptance = {
      minValid: new Date(sourceValue.date) >= new Date(startDate),
      maxValid: new Date(sourceValue.date) <= new Date(endDate)
    };

    var acceptanceResult; //boolean to determine if the relevant range specified is valid

    if (startDate != "" && endDate != "") {

      acceptanceResult = (rangeAcceptance.minValid && rangeAcceptance.maxValid);

    } else if (startDate != "") {

      acceptanceResult = rangeAcceptance.minValid;

    } else if (endDate != "") {

      acceptanceResult = rangeAcceptance.maxValid;

    } else {

      acceptanceResult = (1 == 1); //show all results if no specific range has been selected

    }

    return (acceptanceResult);

  }

  /*console.log({

    originalValues: sourceValues,
    finalValues: sourceValues.filter(filterFunction_dates),
    "time of filter": new Date()

  });*/

  //Return the data for display
  return ({

    originalValues: sourceValues,
    finalValues: sourceValues.filter(filterFunction_dates)

  });

}



//Aim: To make the dates into something that the Range filter function can work with
function normalize_date(fieldValue) {

  var monthPossibilities = {
    longStructure: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    shortStructure: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  }; //To store what the month values could possibly be for returning their relevant index number

  var datePartitions = fieldValue.split(", ");
  var year = datePartitions[1];
  var month = datePartitions[0].substring(0, 3); //first three characters of section 1

  if (monthPossibilities.longStructure.indexOf(month) > -1) {

    month = (monthPossibilities.longStructure.indexOf(month) + 1).toString(); //Increments by one to give the actual month number

  } else if (monthPossibilities.shortStructure.indexOf(month) > -1) {

    month = (monthPossibilities.shortStructure.indexOf(month) + 1).toString();

  } else {

    month = "";

  }

  //Aim: Add that customary zero to prepend the date value
  if ((month.length < 2) && (month.length > 0)) {

    month = "0" + month;

  }

  var day = datePartitions[0].slice(-2); //last two characters of section 1    
  var finalResult = year + "-" + month + "-" + day;

  return (finalResult);

}




//Aim: Display json in a nicely formatted way
function preview_json(data, target) {

  /*Curtosy of fellow fiddler: http://jsfiddle.net/unLSJ/*/
  var library = {};

  library.json = {
    replacer: function(match, pIndent, pKey, pVal, pEnd) {
      var key = '<span class=json-key>';
      var val = '<span class=json-value>';
      var str = '<span class=json-string>';
      var r = pIndent || '';
      if (pKey)
        r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
      if (pVal)
        r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
      return r + (pEnd || '');
    },
    prettyPrint: function(obj) {
      var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
      return JSON.stringify(obj, null, 3)
        .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
        .replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(jsonLine, library.json.replacer);
    }
  };

  //Show json in desired target
  target.html(library.json.prettyPrint(data));

}