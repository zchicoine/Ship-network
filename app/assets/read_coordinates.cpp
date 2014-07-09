

/*

Do not touch this file ...... do not alter any changes.. this is a backup of my work to read coordiantes from 
external text file and give you the required format to set polygons on google maps. This code could be used to 
identify any country and draw a polygon on its border.
 This file should be run in a C++ studio or in any other compiler. 
*/
#include <iostream>
#include <stdio.h>
#include <fstream>
#include <string>
#include <cctype>
#include <ctype.h>
#include <iomanip>
#include <vector>


using namespace std;
ifstream file;
string line;
string word[1000];


void insert(vector<string> v){

	ofstream out("out.txt");
	vector<string>::iterator it;
	for (it = v.begin(); it < v.end();it++)
	out << "new google.maps.LatLng(" +*it+ ")," << endl;
}
int main(){

	const string* ptr;
	vector<string> v;
	file.open("maps.txt");

	int p = 0;
	while (getline(file,line)){
		int len = line.length();

		for (int i = 0; i < len; i++){
		
			if (line[i] == ','){
				
				v.push_back(line.substr(p, i - p));

				p = i + 1;

			}
		
		}
				insert(v);
		

	}


	system("pause");
	return 0;
}