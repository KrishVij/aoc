async function turnOnTwoBatteriesRange(range) {

		let finalSumRange = 0;
		let maxJoltage = -1;
		let maxJoltageIndex = -1;
		let secondMaxJoltage = -1;
		let secondMaxJoltageIndex = -1;

		for (let i = 0; i < range.length; i++) {

				const num = range[i];
				if (!/[0-9]/.test(num)) continue;
				const val = Number(num);
				
				if  (val > maxJoltage) {

						secondMaxJoltage = maxJoltage;
						secondMaxJoltageIndex = maxJoltageIndex;
						maxJoltage = val;
						maxJoltageIndex = i;
				}else if (val < maxJoltage && val > secondMaxJoltage) {

						secondMaxJoltage = val;
						secondMaxJoltageIndex = i;
				}
		}

		if (secondMaxJoltage === -1) secondMaxJoltage = 0;
		if (secondMaxJoltageIndex < maxJoltageIndex) {

				// console.log(secondMaxJoltageIndex);
				// console.log(maxJoltageIndex);
				// console.log(Number(`${secondMaxJoltage}${maxJoltage}`))
				finalSumRange += Number(`${secondMaxJoltage}${maxJoltage}`);
		}else {

				finalSumRange += Number(`${maxJoltage}${secondMaxJoltage}`);
		}

		return finalSumRange;
}

async function turnOnTwoBatteries(filePath) {

		const file = Bun.file(filePath);
		const text = await file.text();
		let finalSum = 0;
		
		for (const line of text.split("\n")) {
				
				const bank = line.trim();
				const batteries = [...bank];
				if (bank === "") continue;
				let maxJoltage = -1;
				let maxJoltageIndex = -1;
				let secondMaxJoltage = -1;
				let secondMaxJoltageIndex = -1;

				for (let i = 0; i < batteries.length; i++) {

						const battery = batteries[i];
						if (!/[0-9]/.test(battery)) continue;
						const val = Number(battery);
						
						if  (val > maxJoltage) {

								secondMaxJoltage = maxJoltage;
								secondMaxJoltageIndex = maxJoltageIndex;
								maxJoltage = val;
								maxJoltageIndex = i
						}else if (val < maxJoltage && val > secondMaxJoltage) {

								secondMaxJoltage = val;
								secondMaxJoltageIndex = i;
						}
				}

				if (secondMaxJoltage === -1) secondMaxJoltage = 0;
				if (secondMaxJoltageIndex < maxJoltageIndex) {

						// console.log(secondMaxJoltageIndex);
						// console.log(maxJoltageIndex);
						// console.log(Number(`${secondMaxJoltage}${maxJoltage}`))
						let updatedSum = await turnOnTwoBatteriesRange(String(bank.substring(maxJoltageIndex)));
						if (updatedSum > Number(`${secondMaxJoltage}${maxJoltage}`)) {

								finalSum += updatedSum
						}else {

								finalSum += Number(`${secondMaxJoltage}${maxJoltage}`);
						}
				}else {

						let updatedSum = await turnOnTwoBatteriesRange(String(bank.substring(
								Math.max(maxJoltageIndex, secondMaxJoltageIndex)
						)));
						if (updatedSum > Number(`${secondMaxJoltage}${maxJoltage}`)) {

								finalSum += updatedSum
						}else {
								finalSum += Number(`${maxJoltage}${secondMaxJoltage}`);
						}
				}
		}

		return finalSum;
}

const result = await turnOnTwoBatteries("aocq3final.txt");
console.log(result);



