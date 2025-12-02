import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.regex.Pattern;

class Q1 {

	void main(String[] args) {

		int startingPoint = 50;
		int Password = 0;
		String number = "";
		//char rotationIndices = '';
		
		try (BufferedReader br =  new BufferedReader(new FileReader("input.txt"))) {

			String line = br.readLine();
			
			while (line != null) {

				char rotationIndices = line.charAt(0);
				
				for (char s : line.toCharArray()) {

					if (Character.toString(s).matches("[0-9]+")) {

						number += s;
					}
				}

				int num = Integer.parseInt(number);

				if (rotationIndices == 'L') {

					startingPoint = ((startingPoint - num) % 100);
					if (startingPoint == 0) {

						Password++;
					}

					num = 0;
					number = "";
				}else if (rotationIndices == 'R') {

					startingPoint = ((startingPoint + num) % 100);
					if (startingPoint == 0) {

						Password++;
					}

					num = 0;
					number = "";
				}

				if (startingPoint == 0) {

					Password++;
				}
				line = br.readLine();
			}
		}catch(IOException e) {

			e.printStackTrace();
		}

		System.out.println(Password);
	}

	
}
