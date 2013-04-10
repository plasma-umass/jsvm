package edu.umass.cs;

public class TestAnewarray {
	public static void main(String[] args)
	{
		SomeClass[] anArray;
		anArray = new SomeClass[4];
		SomeClass a = new SomeClass();
		a.happy_field_1 = 17;
		anArray[0] = a;
		SomeClass b = anArray[0];
		int foo = b.happy_field_1;
	}
	
}