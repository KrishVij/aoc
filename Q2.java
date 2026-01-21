import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

class Q2 {

	void main(String[] args) {

		try (BufferedReader br  = new BufferedReader(new FileReader("input2.txt"))) {

			String line = br.readLine();
			long finalSum = 0;
			
			
			while (line != null) {

				String firstDate = "";
				String lastDate  = "";
				int  idx = line.indexOf('-');

				if (idx != -1) {

					firstDate = line.substring(0, idx);
					lastDate = line.substring(idx + 1).replace(",", "");

				}

				for (long i = Long.parseLong(firstDate) ; i <= Long.parseLong(lastDate); i++) {

					boolean ok = true;

					if (String.valueOf(i).length() % 2 == 0) {
						
						int mid = String.valueOf(i).length() / 2;
						int firstHalfIndex = mid - 1;
						int secondHalfIndex =  String.valueOf(i).length() - 1;

						while (firstHalfIndex >= 0) {

							if (String.valueOf(i).charAt(firstHalfIndex) != String.valueOf(i).charAt(secondHalfIndex)) {

								ok = false;
								break;
							}

							firstHalfIndex--;
							secondHalfIndex--;

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
