public class Invokeinterface implements B
{
  public static void main(String args[])
  {
    Invokeinterface t = new Invokeinterface();
    B a = (B) t;
    a.a();
  }

  public void a()
  {
    System.out.println("A");
  }

  public void b()
  {
    System.out.println("B");
  }  
}
