import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

class Q2 {

	void main(String[] args) {

		try (BufferedReader br  = new BufferedReader(new FileReader("aocq2.txt"))) {

			String line = br.readLine();
			int finalSum = 0;
			

			while (line != null) {

				String firstDate = "";
				String lastDate  = "";
				int idx = line.indexOf('-');

				if (idx != -1) {

					firstDate = line.substring(0, idx);
					lastDate = line.substring(idx + 1, line.toCharArray().length - 1);

				}

				for (int i = Integer.parseInt(firstDate) ; i <= Integer.parseInt(lastDate); i++) {

					boolean ok = true;

					if (String.valueOf(i).length() % 2 == 0) {

						int firstHalfIndex = String.valueOf(i).length() / 2 - 1;
						int secondHalfIndex = String.valueOf(i).length() / 2;

						while (firstHalfIndex >= 0) {

							if (String.valueOf(i).charAt(firstHalfIndex) != String.valueOf(i).charAt(secondHalfIndex)) {

								ok = false;
								break;
							}

							firstHalfIndex--;
							secondHalfIndex++;

						}

						if (ok) {

							System.out.println(i);
							finalSum += i;
						}
					}

				}
				
				
				line = br.readLine();
			}

			System.out.println(finalSum);
		}catch (IOException io) {

			io.printStackTrace();
		}
	}
}
