package edu.umass.cs;

public class TestMultiarray {
	public static void main(String[] args)
	{
		SomeClass[][][][] anArray;
		anArray = new SomeClass[4][3][6][7];
		SomeClass a = new SomeClass();
		a.happy_field_1 = 17;
		anArray[1][2][4][3] = a;
		SomeClass b = anArray[1][2][4][3];
		int foo = b.happy_field_1;
	}
	
}