//document I/O
const BillInput = document.getElementById("BillInput");
const TipButton = [
	document.getElementById("5"),
	document.getElementById("10"),
	document.getElementById("15"),
	document.getElementById("25"),
	document.getElementById("50"),
	document.getElementById("CustomTip"),
];
const NumOfPeople = document.getElementById("NumOfPeople");
const NumOfPeopleError = document.getElementById("NumOfPeopleError");
const TipAmount = document.getElementById("TipAmount");
const Total = document.getElementById("Total");
const Reset = document.getElementById("Reset");

//Variables
let ActiveTip;
let NumOfPeopleValue = 1;
let bill = 0;
let TipAmountValue;
let Tip = 0;
let TipCostum;
let TotalValue;

//EventListeners
for (let i = 0; i < TipButton.length - 1; i++) {
	TipButton[i].addEventListener("click", toggle);
}
TipButton[5].addEventListener("input", toggle);

TipButton[5].addEventListener("focusin", () => {
	TipButton[5].type = "number";
	if (TipCostum) TipButton[5].value = TipCostum * 100;
	document.getElementById(ActiveTip).classList.remove("active");
	update();
});

TipButton[5].addEventListener("focusout", () => {
	if (TipButton[5].value) {
		TipCostum = TipButton[5].value / 100;
		Tip = TipCostum;
		TipButton[5].type = "text";
		TipButton[5].value += "%";
	}
	update();
});

BillInput.addEventListener("change", () => {
	if (BillInput.value < 0) {
		bill = 0;
		BillInput.value = bill;
	}
	update();
});

BillInput.addEventListener("click", () => {
	if (BillInput.value == 0) BillInput.value = "";
});

BillInput.addEventListener("focusout", () => {
	if (BillInput.value == "") BillInput.value = 0;
});

BillInput.addEventListener("input", () => {
	bill = BillInput.value > 0 ? BillInput.value : 0;
	update();
});

NumOfPeople.addEventListener("change", () => {
	if (NumOfPeople.value <= 0) {
		NumOfPeopleValue = 1;
		NumOfPeople.value = NumOfPeopleValue;
	}
	update();
});

NumOfPeople.addEventListener("input", () => {
	if (NumOfPeople.value <= 0) {
		NumOfPeopleError.innerText = "Can't be zero";
		NumOfPeopleError.style.color = "red";
		NumOfPeople.style.border = "2px solid red";
	} else {
		NumOfPeopleError.innerText = null;
		NumOfPeopleError.style.color = "#5e7a7d";
		NumOfPeople.style.border = "2px solid #26c0ab";
	}
	NumOfPeopleValue = NumOfPeople.value > 0 ? NumOfPeople.value : 1;
	update();
});

NumOfPeople.addEventListener("focusout", () => {
	NumOfPeople.style.border = "2px solid transparent";
});

NumOfPeople.addEventListener("focusin", () => {
	NumOfPeople.style.border = "2px solid #26c0ab";
});

Reset.addEventListener("click", ResetAll);

function ResetAll() {
	bill = 0;
	Tip = 0;
	TipCostum = NaN;
	TipButton[5].type = "number";
	TipButton[5].value = "";
	if (ActiveTip) document.getElementById(ActiveTip).classList.remove("active");
	ActiveTip = "";
	NumOfPeopleValue = 1;
	NumOfPeople.value = 1;
	BillInput.value = 0;
	TipAmount.innerText = "0.00";
	Total.innerText = "0.00";
}

function toggle() {
	if (ActiveTip) document.getElementById(ActiveTip).classList.remove("active");
	this.classList.add("active");
	ActiveTip = this.id;
	this.id !== "CustomTip"
		? (Tip = parseInt(ActiveTip) / 100)
		: (Tip = TipButton[5].value / 100);
	update();
}

function update() {
	TipAmountValue = (parseFloat(bill) * Tip) / parseInt(NumOfPeopleValue);
	TipAmount.innerText = TipAmountValue.toFixed(2);

	TotalValue =
		(parseFloat(bill) + parseFloat(bill) * Tip) / parseInt(NumOfPeopleValue);
	Total.innerText = TotalValue.toFixed(2);
}
