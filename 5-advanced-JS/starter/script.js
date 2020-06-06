let billArrayObj = {
  bills: [124, 48, 268, 180, 42],
  tips: [],
  finalPaid: [],
  avgTip: []
};

let billAvgSum = {
  bills: [77, 375, 110, 45],
  tips: [],
  finalPaid: [],
  avgTip: []
};

let currentSum;

function billAvgSumFunc(arrayParamObj) {
  let tip;
  let finalPaidAmt;
  for (let i = 0; i < arrayParamObj.bills.length; i++) {
    if (arrayParamObj.bills[i] < 100) {
      tip = arrayParamObj.bills[i] * 0.20;
      billAvgSum.tips.push(tip);
      finalPaidAmt = arrayParamObj.bills[i] + tip;
      billAvgSum.finalPaid.push(finalPaidAmt);

    } else if (arrayParamObj.bills[i] > 100 && arrayParamObj.bills[i] < 300) {
      tip = arrayParamObj.bills[i] * 0.10;
      billAvgSum.tips.push(tip);
      finalPaidAmt = arrayParamObj.bills[i] + tip;
      billAvgSum.finalPaid.push(finalPaidAmt);

    } else {
      tip = arrayParamObj.bills[i] * 0.25;
      billAvgSum.tips.push(tip);
      finalPaidAmt = arrayParamObj.bills[i] + tip;
      billAvgSum.finalPaid.push(finalPaidAmt);

    }
  }
  currentSum = (arrayParamObj.tips[0] + arrayParamObj.tips[1] + arrayParamObj.tips[2] + arrayParamObj.tips[3]) / 4;
  arrayParamObj.avgTip.push(currentSum);
  console.log(arrayParamObj.avgTip);

  return arrayParamObj;
}

billAvgSumFunc(billAvgSum);

/////////////////////////

function tipCalcMethod(arrayParamObj) {
  let tip;
  let finalPaidAmt;
  for (let i = 0; i < arrayParamObj.bills.length; i++) {
    if (arrayParamObj.bills[i] < 50) {
      tip = arrayParamObj.bills[i] * 0.20;
      billArrayObj.tips.push(tip);
      finalPaidAmt = arrayParamObj.bills[i] + tip;
      billArrayObj.finalPaid.push(finalPaidAmt);
    } else if (arrayParamObj.bills[i] < 200 && arrayParamObj.bills[i] > 50) {
      tip = arrayParamObj.bills[i] * 0.15;
      billArrayObj.tips.push(tip);
      finalPaidAmt = arrayParamObj.bills[i] + tip;
      billArrayObj.finalPaid.push(finalPaidAmt);
    } else {
      tip = arrayParamObj.bills[i] * 0.10;
      billArrayObj.tips.push(tip);
      finalPaidAmt = arrayParamObj.bills[i] + tip;
      billArrayObj.finalPaid.push(finalPaidAmt);
    }
  }
  currentSum = (arrayParamObj.tips[0] + arrayParamObj.tips[1] + arrayParamObj.tips[2] + arrayParamObj.tips[3]) / 5;
  arrayParamObj.avgTip.push(currentSum);
  console.log(arrayParamObj.avgTip);

  return arrayParamObj;
}

tipCalcMethod(billArrayObj);

function whoPaidMore() {
  if (billArrayObj.avgTip > billAvgSum.avgTip) {
    console.log('John tips higher on average');

  } else {
    console.log('Mark tips higher on average');

  }

}

whoPaidMore();
