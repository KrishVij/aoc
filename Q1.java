import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.regex.Pattern;

class Q1 {

	void main(String[] args) {

		int startingPoint = 50;
		int Password = 0;
		String number = "";
		
		try (BufferedReader br =  new BufferedReader(new FileReader("input.txt"))) {

			String line = br.readLine();
			
			while (line != null) {

				char rotationIndices = line.charAt(0);

				int count = 0;
				
				for (char s : line.toCharArray()) {

					if (Character.toString(s).matches("[0-9]+")) {

						number += s;
					}
				}

				int num = Integer.parseInt(number);

				if (rotationIndices == 'L') {

					int stepsToNextZeroLeft = startingPoint;

					if (stepsToNextZeroLeft == 0) {

						count = num/100;
					}else if (stepsToNextZeroLeft <= num) {

						count = (num - stepsToNextZeroLeft) / 100 + 1;
                    }

					startingPoint = ((startingPoint - num) % 100);
					if (startingPoint < 0) {

						startingPoint += 100;
					}
					
					num = 0;
					number = "";
				}else if (rotationIndices == 'R') {

					int stepsToNextZeroRight = (100 - startingPoint) % 100;
					if (stepsToNextZeroRight == 0) {

						count = num/100;
					}else if (stepsToNextZeroRight <= num) {

						count = (num - stepsToNextZeroRight) / 100 + 1;
					}
					
					startingPoint = ((startingPoint + num) % 100);
					
					num = 0;
					number = "";
				}

				Password += count;

				line = br.readLine();
			}
		}catch(IOException io) {

			io.printStackTrace();
		}

		System.out.println(Password);
	}

	
}
