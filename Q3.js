async function turnOnTwoBatteries(filePath) {

		const file = Bun.file(filePath);
		const text = await file.text();
		let finalSum = 0;
		
		for (const line of text.split("\n")) {
				
				const bank = line.trim();
				if (bank === "") continue;
				let maxJoltage = -1;
				let maxJoltageIndex = -1;
				let secondMaxJoltage = -1;
				let secondMaxJoltageIndex = -1;

				for (const battery of [...bank]) {

						if (!/[0-9]/.test(battery)) continue;
						const val = Number(battery);
						
						if  (val > maxJoltage) {

								secondMaxJoltage = maxJoltage;
								secondMaxJoltageIndex = bank.indexOf(String(secondMaxJoltage));
								maxJoltage = val;
								maxJoltageIndex = bank.indexOf(String(maxJoltage));
						}else if (val < maxJoltage && val > secondMaxJoltage) {

								secondMaxJoltage = val;
								secondMaxJoltageIndex = bank.indexOf(String(secondMaxJoltage));
						}
				}

				if (secondMaxJoltage === -1) secondMaxJoltage = 0;
				console.log(`The max joltage is ${maxJoltage} and the second max joltage is ${secondMaxJoltage}`);
				if (secondMaxJoltageIndex < maxJoltageIndex) {

						finalSum += Number(`${secondMaxJoltage}${maxJoltage}`);
				}else {

						finalSum += Number(`${maxJoltage}${secondMaxJoltage}`);
				}
		}

		return finalSum;
}

const result = await turnOnTwoBatteries("aocq3.txt");
console.log(result);



