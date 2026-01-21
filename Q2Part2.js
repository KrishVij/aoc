const file = Bun.file("Q2Part2MainInput.txt");
const text = await file.text();

let finalSum = 0n;

for (const line of text.split("\n")) {

		let begin = "";
		let end = "";

		const idx = line.indexOf("-");
		if (idx !== -1) {
				begin = line.substring(0, idx);
				end   = line.substring(idx + 1).replace(",", "");
		}

		finalSum += findInvalidIDS2(begin, end);
		console.log(finalSum);
}


function findInvalidIDS2(begin, end) {

		let sum = 0n;
		const BEGIN = BigInt(begin);
		const END   = BigInt(end);

		/*
			The below code block takes
			two numbers i.e the range
			as input.
		*/
		for (let i = BEGIN; i <= END; i+=1n) {

				/* Here we calculate the number of digits of the first number in our range. */
				let temp = i;
				let digitCount = 0n;
				while (temp > 0n) {
						// temp = Math.floor(temp / 10n);
						temp /= 10n;
						digitCount++;
				}

				/*
					The below for loop is for finding that for  any number n with d digits,
					test every way to split d into block repeats  k ≥ 2.
				*/
				for (let k = 2n; k <= digitCount; k++) {

						/*
							If for example we have n = 565656 and then digitCount = 6
							so suppose k = 4 if we do 6 % 4 != 0 this tells us that this many number
							of repetetions wont give us an invalid number or a repdigit because then the number
							is not being repeated in an equal manner.
						*/
						if (digitCount % k === 0n) {

								/*
									Here blocklength = total number of digits / how many times repetetion occurs
									so a particular number inside the bigger number say 56 in 565656 is repeated 3 times.
								*/
								let blockLength = digitCount / k;

								/* The magic mask in the formula. */
								const TEN = 10n;
								// let r = (Math.pow(10, digitCount) - 1) / (Math.pow(10, blockLength) - 1);
								let r = (TEN ** digitCount - 1n) / (TEN ** blockLength - 1n);

								/*
									If the original number modulo the mask gives us 0 then the number is an invalid
									number or a repdigit
								*/
								if (i % r === 0n) {
										/*
											We break out after finding one invalid id, to elaborate
											take for ex: 111111 here we have 3 ways via which repetetion could be true
											k = 2 → blockLength = 3 → valid
											k = 3 → blockLength = 2 → valid
											k = 6 → blockLength = 1 → valid
											thus if we dont break out we add all these valid repdigits.
										*/
										
										sum += i;
										break;
								}
						}
				}
		}

		return sum;
}

// console.log(findInvalidIDS2(446443, 446449));
