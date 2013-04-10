package edu.umass.cs;

public class TestRecursion {

	public static int sum = 0;
	
	static void myMethod( int counter)
	{
	if(counter == 0)
	     return;
	else
	       {
	       sum = sum + counter; 
	       myMethod(--counter);
	       return;
	       }
	}
	
	public static void main(String[] args){
		myMethod(5);
		System.out.println("Sum = " + sum);
	}

}