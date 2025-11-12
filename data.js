export const data = {
    groups: [
        [
            { title: 'Pass1', code: String.raw`import java.util.*;
class Pass1Simple {
    public static void main(String[] args) {
        String code[] = {
            "START 100",
            "MOVER AREG,NUM",
            "ADD BREG,='5'",
            "NUM DC 5",
            "END"
        };
        Map<String,String> MOT = Map.of(
            "STOP","IS,00","ADD","IS,01","SUB","IS,02","MULT","IS,03",
            "MOVER","IS,04","MOVEM","IS,05","DC","DL,01","DS","DL,02",
            "START","AD,01","END","AD,02"
        );
        Map<String,Integer> SYMTAB = new LinkedHashMap<>();
        List<String> IC = new ArrayList<>();
        int LC = 0;

        for (String line : code) {
            String t[] = line.trim().split("[ ,]+"), op = t[0];
            if (op.equals("START")) { LC = Integer.parseInt(t[1]); IC.add("(AD,01) (C,"+LC+")"); continue; }
            if (op.equals("END")) { IC.add("(AD,02)"); break; }

            if (MOT.containsKey(op)) {
                String info = MOT.get(op);
                String out = "("+info+")";
                if (info.startsWith("IS")) {
                    if (t.length > 1 && t[1].endsWith("REG")) out += " (R," + t[1].charAt(0) + ")";
                    if (t.length > 2) {
                        String opr = t[2];
                        if (opr.startsWith("='")) out += " (L,"+opr+")";
                        else { SYMTAB.putIfAbsent(opr, LC); out += " (S,"+opr+")"; }
                    }
                    IC.add(out); LC++;
                } else if (op.equals("DC")) {
                    SYMTAB.put(t[0], LC); IC.add("(DL,01) (C,"+t[2]+")"); LC++; }
                else if (op.equals("DS")) {
                    SYMTAB.put(t[0], LC); IC.add("(DL,02) (C,"+t[2]+")"); LC += Integer.parseInt(t[2]); }
            }
        }

        System.out.println("--- INTERMEDIATE CODE ---");
        IC.forEach(System.out::println);
        System.out.println("--- SYMBOL TABLE ---");
        SYMTAB.forEach((k,v)->System.out.println(k+"\t"+v));
    }
}
` },
            { title: 'DLL2', code: String.raw`Public Class MathOperations
 Public Function Add(ByVal a As Integer, ByVal b As Integer) As Integer
 Return a + b
 End Function
 Public Function Subtract(ByVal a As Integer, ByVal b As Integer) As Integer
 Return a - b
 End Function
 Public Function Multiply(ByVal a As Integer, ByVal b As Integer) As Integer
 Return a * b
 End Function
 Public Function Divide(ByVal a As Integer, ByVal b As Integer) As Double
 If b <> 0 Then
 Return a / b
 Else
 Throw New DivideByZeroException("Cannot divide by zero.")
 End If
 End Function
End Class

Imports MathLibrary
Module Module1
 Sub Main()
 Dim obj As New MathOperations()
 Dim a As Integer = 10
 Dim b As Integer = 5
 Console.WriteLine("Addition: " & obj.Add(a, b))
 Console.WriteLine("Subtraction: " & obj.Subtract(a, b))
 Console.WriteLine("Multiplication: " & obj.Multiply(a, b))
 Console.WriteLine("Division: " & obj.Divide(a, b))
 Console.ReadLine()
 End Sub
End Module` }
        ],
        [
            { title: 'FCFS', code: String.raw`import java.util.*;

public class FCFS {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
            System.out.print("Enter number of processes: ");
            int n = sc.nextInt();
            int bt[] = new int[n], wt[] = new int[n], tat[] = new int[n];
            System.out.println("Enter burst times:");
            for (int i = 0; i < n; i++) {
                System.out.print("P" + (i + 1) + ": ");
                bt[i] = sc.nextInt();
            }
            wt[0] = 0;
            for (int i = 1; i < n; i++)
                wt[i] = wt[i - 1] + bt[i - 1];
            for (int i = 0; i < n; i++)
                tat[i] = wt[i] + bt[i];

            float avgWT = 0, avgTAT = 0;
            System.out.println("\nProcess\tBT\tWT\tTAT");
            for (int i = 0; i < n; i++) {
                System.out.println("P" + (i + 1) + "\t" + bt[i] + "\t" + wt[i] + "\t" + tat[i]);
                avgWT += wt[i];
                avgTAT += tat[i];
            }
            System.out.println("\nAverage WT = " + avgWT / n);
            System.out.println("Average TAT = " + avgTAT / n);
        }

}` },
            { title: 'RoundRobun', code: String.raw`import java.util.*;
public class RoundRobin {

public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter number of processes: ");
        int n = sc.nextInt();
        int bt[] = new int[n], rt[] = new int[n], wt[] = new int[n], tat[] = new int[n];
        System.out.println("Enter burst times:");
        for (int i = 0; i < n; i++) {
            System.out.print("P" + (i + 1) + ": ");
            bt[i] = sc.nextInt();
            rt[i] = bt[i];
        }
        System.out.print("Enter Time Quantum: ");
        int tq = sc.nextInt();

        int t = 0;
        boolean done;
        do {
            done = true;
            for (int i = 0; i < n; i++) {
                if (rt[i] > 0) {
                    done = false;
                    if (rt[i] > tq) {
                        t += tq;
                        rt[i] -= tq;
                    } else {
                        t += rt[i];
                        wt[i] = t - bt[i];
                        rt[i] = 0;
                    }
                }
            }
        } while (!done);

        for (int i = 0; i < n; i++)
            tat[i] = bt[i] + wt[i];

        float avgWT = 0, avgTAT = 0;
        System.out.println("\nProcess\tBT\tWT\tTAT");
        for (int i = 0; i < n; i++) {
            System.out.println("P" + (i + 1) + "\t" + bt[i] + "\t" + wt[i] + "\t" + tat[i]);
            avgWT += wt[i];
            avgTAT += tat[i];
        }
        System.out.println("\nAverage WT = " + avgWT / n);
        System.out.println("Average TAT = " + avgTAT / n);
    }
}` },
            { title: 'SJF-Preemptive', code: String.raw`import java.util.*;

public class SJF_Preemptive {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter number of processes: ");
        int n = sc.nextInt();
        int bt[] = new int[n], at[] = new int[n], rt[] = new int[n], wt[] = new int[n], tat[] = new int[n];
        for (int i = 0; i < n; i++) {
            System.out.print("Arrival Time of P" + (i + 1) + ": ");
            at[i] = sc.nextInt();
            System.out.print("Burst Time of P" + (i + 1) + ": ");
            bt[i] = sc.nextInt();
            rt[i] = bt[i];
        }
        int complete = 0, t = 0, minm = Integer.MAX_VALUE, shortest = 0, finish;
        boolean check = false;

        while (complete != n) {
            for (int j = 0; j < n; j++) {
                if ((at[j] <= t) && (rt[j] < minm) && rt[j] > 0) {
                    minm = rt[j];
                    shortest = j;
                    check = true;
                }
            }
            if (!check) { t++; continue; }

            rt[shortest]--;
            minm = (rt[shortest] == 0) ? Integer.MAX_VALUE : rt[shortest];

            if (rt[shortest] == 0) {
                complete++;
                check = false;
                finish = t + 1;
                wt[shortest] = finish - bt[shortest] - at[shortest];
                if (wt[shortest] < 0) wt[shortest] = 0;
            }
            t++;
        }

        float avgWT = 0, avgTAT = 0;
        System.out.println("\nProcess\tAT\tBT\tWT\tTAT");
        for (int i = 0; i < n; i++) {
            tat[i] = bt[i] + wt[i];
            avgWT += wt[i];
            avgTAT += tat[i];
            System.out.println("P" + (i + 1) + "\t" + at[i] + "\t" + bt[i] + "\t" + wt[i] + "\t" + tat[i]);
        }
        System.out.println("\nAverage WT = " + avgWT / n);
        System.out.println("Average TAT = " + avgTAT / n);
    }
}` },
            { title: 'Priority-non-preemptive', code: String.raw`import java.util.*;
public class PriorityNonPreemptive {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter number of processes: ");
        int n = sc.nextInt();
        int bt[] = new int[n], pr[] = new int[n], wt[] = new int[n], tat[] = new int[n];
        for (int i = 0; i < n; i++) {
            System.out.print("Burst Time of P" + (i + 1) + ": ");
            bt[i] = sc.nextInt();
            System.out.print("Priority of P" + (i + 1) + ": ");
            pr[i] = sc.nextInt();
        }

        for (int i = 0; i < n - 1; i++)
            for (int j = i + 1; j < n; j++)
                if (pr[i] > pr[j]) {
                    int temp = pr[i]; pr[i] = pr[j]; pr[j] = temp;
                    temp = bt[i]; bt[i] = bt[j]; bt[j] = temp;
                }

        wt[0] = 0;
        for (int i = 1; i < n; i++)
            wt[i] = wt[i - 1] + bt[i - 1];
        for (int i = 0; i < n; i++)
            tat[i] = wt[i] + bt[i];

        float avgWT = 0, avgTAT = 0;
        System.out.println("\nProcess\tBT\tPriority\tWT\tTAT");
        for (int i = 0; i < n; i++) {
            System.out.println("P" + (i + 1) + "\t" + bt[i] + "\t" + pr[i] + "\t\t" + wt[i] + "\t" + tat[i]);
            avgWT += wt[i];
            avgTAT += tat[i];
        }
        System.out.println("\nAverage WT = " + avgWT / n);
        System.out.println("Average TAT = " + avgTAT / n);
    }
}` }
        ],
        [
            { title: 'FIFO', code: String.raw`import java.io.*;
public class FIFO {
 public static void main(String[] args) throws IOException 
 {
 BufferedReader br = new BufferedReader(new 
InputStreamReader(System.in));
 int frames, pointer = 0, hit = 0, fault = 0,ref_len;
 int buffer[];
 int reference[];
 int mem_layout[][];
 
 System.out.println("Please enter the number of Frames: ");
 frames = Integer.parseInt(br.readLine());
 
 System.out.println("Please enter the length of the Reference 
string: ");
 ref_len = Integer.parseInt(br.readLine());
 
 reference = new int[ref_len];
 mem_layout = new int[ref_len][frames];
 buffer = new int[frames];
 for(int j = 0; j < frames; j++)
 buffer[j] = -1;
 
 System.out.println("Please enter the reference string: ");
 for(int i = 0; i < ref_len; i++)
 {
 reference[i] = Integer.parseInt(br.readLine());
 }
 System.out.println();
 for(int i = 0; i < ref_len; i++)
 {
 int search = -1;
 for(int j = 0; j < frames; j++)
 {
 if(buffer[j] == reference[i])
 {
 search = j;
 hit++;
 break;
 } 
 }
 if(search == -1)
 {
 buffer[pointer] = reference[i];
 fault++;
 pointer++;
 if(pointer == frames)
 pointer = 0;
 }
 for(int j = 0; j < frames; j++)
 mem_layout[i][j] = buffer[j];
 }
 
 for(int i = 0; i < frames; i++)
 {
 for(int j = 0; j < ref_len; j++)
 System.out.printf("%3d ",mem_layout[j][i]);
 System.out.println();
 }
 
 System.out.println("The number of Hits: " + hit);
 System.out.println("Hit Ratio: " + (float)((float)hit/ref_len));
 System.out.println("The number of Faults: " + fault);
 }
 
}` },
            { title: 'LRU', code: String.raw`import java.io.*;
import java.util.*;
public class LRU {
 public static void main(String[] args) throws IOException 
 {
 BufferedReader br = new BufferedReader(new 
InputStreamReader(System.in));
 int frames,pointer = 0, hit = 0, fault = 0,ref_len;
 Boolean isFull = false;
 int buffer[];
 ArrayList<Integer> stack = new ArrayList<Integer>();
 int reference[];
 int mem_layout[][];
 
 System.out.println("Please enter the number of Frames: ");
 frames = Integer.parseInt(br.readLine());
 
 System.out.println("Please enter the length of the Reference string: 
");
 ref_len = Integer.parseInt(br.readLine());
 
 reference = new int[ref_len];
 mem_layout = new int[ref_len][frames];
 buffer = new int[frames];
 for(int j = 0; j < frames; j++)
 buffer[j] = -1;
 
 System.out.println("Please enter the reference string: ");
 for(int i = 0; i < ref_len; i++)
 {
 reference[i] = Integer.parseInt(br.readLine());
 }
 System.out.println();
 for(int i = 0; i < ref_len; i++)
 {
 if(stack.contains(reference[i]))
 {
 stack.remove(stack.indexOf(reference[i]));
 }
 stack.add(reference[i]);
 int search = -1;
 for(int j = 0; j < frames; j++)
 {
 if(buffer[j] == reference[i])
 {
 search = j;
 hit++;
 break;
 }
 }
 if(search == -1)
 {
 if(isFull)
 {
 int min_loc = ref_len;
 for(int j = 0; j < frames; j++)
 {
 if(stack.contains(buffer[j]))
 {
 int temp = stack.indexOf(buffer[j]);
 if(temp < min_loc)
 {
 min_loc = temp;
 pointer = j;
 }
 }
 }
 }
 buffer[pointer] = reference[i];
 fault++;
 pointer++;
 if(pointer == frames)
 {
 pointer = 0;
 isFull = true;
 }
 }
 for(int j = 0; j < frames; j++)
 mem_layout[i][j] = buffer[j];
 }
 
 for(int i = 0; i < frames; i++)
 {
 for(int j = 0; j < ref_len; j++)
 System.out.printf("%3d ",mem_layout[j][i]);
 System.out.println();
 }
 
 System.out.println("The number of Hits: " + hit);
 System.out.println("Hit Ratio: " + (float)((float)hit/ref_len));
 System.out.println("The number of Faults: " + fault);
 }
 
}` },
            { title: 'Optimal', code: String.raw`import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
public class OptimalReplacement {
 public static void main(String[] args) throws IOException 
 {
 BufferedReader br = new BufferedReader(new 
InputStreamReader(System.in));
 int frames, pointer = 0, hit = 0, fault = 0,ref_len;
 boolean isFull = false;
 int buffer[];
 int reference[];
 int mem_layout[][];
 
 System.out.println("Please enter the number of Frames: ");
 frames = Integer.parseInt(br.readLine());
 
 System.out.println("Please enter the length of the Reference string: 
");
 ref_len = Integer.parseInt(br.readLine());
 
 reference = new int[ref_len];
 mem_layout = new int[ref_len][frames];
 buffer = new int[frames];
 for(int j = 0; j < frames; j++)
 buffer[j] = -1;
 
 System.out.println("Please enter the reference string: ");
 for(int i = 0; i < ref_len; i++)
 {
 reference[i] = Integer.parseInt(br.readLine());
 }
 System.out.println();
 for(int i = 0; i < ref_len; i++)
 {
 int search = -1;
 for(int j = 0; j < frames; j++)
 {
 if(buffer[j] == reference[i])
 {
 search = j;
 hit++;
 break;
 } 
 }
 if(search == -1)
 {
 if(isFull)
 {
 int index[] = new int[frames];
 boolean index_flag[] = new boolean[frames];
 for(int j = i + 1; j < ref_len; j++)
 {
 for(int k = 0; k < frames; k++)
 {
 if((reference[j] == buffer[k]) && (index_flag[k] == false))
 {
 index[k] = j;
 index_flag[k] = true;
 break;
 }
 }
 }
 int max = index[0];
 pointer = 0;
 if(max == 0)
 max = 200;
 for(int j = 0; j < frames; j++)
 {
 if(index[j] == 0)
 index[j] = 200;
 if(index[j] > max)
 {
 max = index[j];
 pointer = j;
 }
 }
 }
 buffer[pointer] = reference[i];
 fault++;
 if(!isFull)
 {
 pointer++;
 if(pointer == frames)
 {
 pointer = 0;
 isFull = true;
 }
 }
 }
 for(int j = 0; j < frames; j++)
 mem_layout[i][j] = buffer[j];
 }
 
 for(int i = 0; i < frames; i++)
 {
 for(int j = 0; j < ref_len; j++)
 System.out.printf("%3d ",mem_layout[j][i]);
 System.out.println();
 }
 
 System.out.println("The number of Hits: " + hit);
 System.out.println("Hit Ratio: " + (float)((float)hit/ref_len));
 System.out.println("The number of Faults: " + fault);
 }
 
}` }
        ]
    ]
};
