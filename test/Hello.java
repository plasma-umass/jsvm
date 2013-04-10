package edu.umass.cs;

import java.lang.System;
import java.util.Vector;

class Hello {
	public int x = -47;
	protected String foosh = "wazzup?";

	public static int foo = 10;

	/*public static void main(String[] args) {
		for(int i=0; i<args.length; i++) {
			System.out.println("Hello World!"+args[i]);
		}
	}*/
	
	public static int wop() {
		return 123;
	}
	
	public static void main(String[] args) {
		//System.out.println("Our foo: " + foo + ", their foo: " + JustStaticClass.foo);
		/*int a = 0;
		
		try {
			throw new Exception("wow!");
		} catch(IOException e) {
			a-=2;
		} catch(Exception e) {
			a-=1;
		} finally {
			a++;
		}*/
		
		foo = 11;
		
		/*Vector<String> strs = new Vector<String>();
		
		strs.add("a");
		strs.add("b");
		strs.add("c");
		
		for(int i=0; i<1000; i++) {
			for(int j=0; j<100; j++) {
				Hello.wop();
			}
		}*/
		
		System.out.println(System.currentTimeMillis());
		System.out.println("Hello World");
	}

	public long foo(int a, String b, float c) {
		return 0x7FFFFFFFFFFFFFFFl;
	}

	public int foo(int a, String b) {
		return -123;
	}
}

