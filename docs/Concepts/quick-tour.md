---
id: quick-tour
title: A Quick Tour
sidebar_label: A Quick Tour
---

Using the 4D language, printing the traditional "Hello, world!" message on screen can be done in several ways. The most simple is probably to write the following single line in a project method:

```  
ALERT("Hello, World!")
```

This code will display a platform-standard alert dialog box with the "Hello, World!" message, containing an OK button. To execute the code, you just need to click on the execution button in the Method editor:

![alt-text](assets/en/pict3536715.en.png)

Or, you could attach this code to a button in a form and execute the form, in which case clicking on the button would display the alert dialog box. In any cases, you have just executed your first line of 4D code!


## Assigning Values

Data can be put into and copied out of variables, fields, array elements... Putting data into a variable is called assigning the data to the variable and is done with the assignment operator (:=). The assignment operator is also used to assign data to fields or array elements.

```  
MyNumber:=3 //assigns 3 to MyNumber variable  
[Products]Size:=MyNumber //assigns MyNumber variable to [Products]Size field
arrDays{2}:="Tuesday" //assigns "Tuesday" string to the 2nd arrDays element
MyVar:=Length("Acme") //assigns the result of the function (4) to MyVar
```

You MUST distinguish the assignment operator := from the other operators. Rather than combining expressions into a new one, the assignment operator copies the value of the expression to the right of the assignment operator into the variable or field to the left of the operator.

**Important:** Do NOT confuse the assignment operator := with the equality comparison operator =. A different assignment operator (and not =) was deliberately chosen to avoid issues and confusion which often occur with == or === in other programming languages. Such errors are often difficult to recognize by the compiler and lead to time-consuming troubleshooting.

## Variables

The 4D language is strongly typed, although some flexibility is allowed in many cases. You create a typed variable using a `C_XXX` command. For example, to create a variable of the date type, you can write:

```
C_DATE(MyDate) //Date type for MyDate variable
```

Even if it is usually not recommended, you can create variables simply by using them; you do not necessarily need to formally define them as you do with fields. For example, if you want a variable that will hold the current date plus 30 days, you can write:

```
MyOtherDate:=Current date+30
```

The line of code reads “MyOtherDate gets the current date plus 30 days.” This line creates the variable, assigns it with both the (temporary) date type and a content. A variable created by assignment is interpreted as typeless, that is, it can be assigned with other types in other lines and then changes the type dynamically. A variable typed with `C_XXX` cannot change the type. In compiled mode, the type can never be changed, regardless of how the variable was created.

## Commands

4D commands are built-in methods to perform an action. All 4D commands, such as `CREATE RECORD`, or `ALERT`, are described in the _4D Language Reference_ manual, grouped by theme. Commands are often used with parameters, which are passed in brackets () and separated by semicolumns (;). Example:

```
COPY DOCUMENT("folder1\\name1";"folder2\\" ; "new")
```

Some commands are attached to collections or objects, in which case they are named methods and are used using the dot notation. For example: 

```
$c:=New collection(1;2;3;4;5)
$nc:=$c.slice(0;3) //$nc=[1,2,3]  

$lastEmployee:=$employee.last()
```

You can use 4D plug-ins or 4D components that add new commands to your 4D development environment. For example, the 4D Internet Commands plug-in empowers 4D users with a large set of Internet communication utility commands:

```
//sending an email from 4D
$Error:=SMTP_QuickSend($Host;$FromAddress;$ToAddress;$Subject;$Message;$Param;$Port;$User;$Password)
```

4D SVG is an example of a utility component extending the capabilities of your application:

```
//drawing a picture
svgRef:=SVG_New
objectRef:=SVG_New_arc(svgRef;100;100;90;90;180)
```

## Constants

4D proposes an extensed set of predefined constants, whose values are accessible by name. For example, `Read Mode` is a constant (value 2). Predefined constants appear underlined by default in the 4D Method editor. They allow writing more readable code.

```
vRef:=Open document("PassFile";"TEXT";Read Mode) // open doc in read only mode
```

You can also define and use standard constant values in your code, simply by entering their value (numbers) or enclosing with symbols:

```
myValue:=512.5 //number
myName:="Smith" //string
myDate:=!2018/01/21! //date
myHour:=?08:12:55? //time
```

## Methods

4D provides a large number of built-in methods (or commands) but also lets you can create your own **project methods**. Project methods are user-defined methods that contain with commands, operators, and other parts of the language.
Project methods are generic methods, but there are other kinds of methods: Object methods, Form methods, Table methods (Triggers), and Database methods.

A method is composed of statements; each statement consists of one line in the method. A statement performs an action, and may be simple or complex.

For example, the following line is a statement that will display a confirmation dialog box:

```
CONFIRM("Do you really want to close this account?";"Yes";"No")
```

A method also contains tests and loops that control the flow of the execution. 4D methods support `If...Else...End if` and `Case of...Else...End case` branching structures as well as looping structures: `While...End while`, `Repeat...Until`, `For...End for`, and `For each...End for each`:

The following example goes through all the characters of the text vtSomeText:

```
For($vlChar;1;Length(vtSomeText))
  //Do something with the character if it is a TAB
    If(Character code(vtSomeText[[$vlChar]])=Tab)
  //...
    End if
 End for
```

A project method can call another project method with or without parameters (arguments). The parameters are passed to the method in parentheses, following the name of the method. Each parameter is separated from the next by a semicolon (;). The parameters are available within the called method as consecutively numbered local variables: $1, $2,…, $n. A method can return a single value in the $0 parameter. When you call a method, you just type its name:

```
$myText:="hello"
$myText:=Do_Something($myText) //Call the Do_Something method
ALERT($myText) //"HELLO"
 
  //Here the code of the method Do_Something
$0:=Uppercase($1)
```


## Data Types

In the language, the various types of data that can be handled are referred to as data types. There are basic data types (string, numeric, date, time, Boolean, picture, pointers, arrays), and also composite data types (BLOBs, objects, collections).

Note that string and numeric data types can be associated with more than one type of field. When data is put into a field, the language automatically converts the data to the correct type for the field. For example, if an integer field is used, its data is automatically treated as numeric. In other words, you need not worry about mixing similar field types when using the language; it will manage them for you.

However, when using the language it is important that you do not mix different data types. In the same way that it makes no sense to store “ABC” in a Date field, it makes no sense to put “ABC” in a variable used for dates. In most cases, 4D is very tolerant and will try to make sense of what you are doing. For example, if you add a number to a date, 4D will assume that you want to add that number of days to the date, but if you try to add a string to a date, 4D will tell you that the operation cannot work.

There are cases in which you need to store data as one type and use it as another type. The language contains a full complement of commands that let you convert from one data type to another. For example, you may need to create a part number that starts with a number and ends with characters such as “abc”. In this case, you might write:

```
[Products]Part Number:=String(Number)+"abc"
```

If _Number_ is 17, then _[Products]Part Number_ will get the string “17abc”.

The data types are fully defined in the section [Data Types](Concepts/data-types.md).

## Objects and collections 

You can handle 4D language objects and collections using the object notation to get or to set their values. For example:

```
employee.name:="Smith"
```

You can also use a string within square brackets, for example:

```
$vName:=employee["name"]
```

Since an object property value can be an object or a collection, object notation accepts a sequence of symbols to access sub-properties, for example:

```
$vAge:=employee.children[2].age
```

To access a collection element, you have to pass the element number embedded in square brackets:

```
C_COLLECTION(myColl)
myColl:=New collection("A";"B";1;2;Current time)
myCollection[3]  //access to 4th element of the collection
```


## Operators
When you use the language, it is rare that you will simply want a piece of data. It is more likely that you will want to do something to or with that data. You perform such calculations with operators. Operators, in general, take two pieces of data and perform an operation on them that results in a new piece of data. You are already familiar with many operators. For example, 1 + 2 uses the addition (or plus sign) operator to add two numbers together, and the result is 3. This table shows some familiar numeric operators:

|Operator|Operation|Example  
---|---|---|
|+|	Addition | 1 + 2 results in 3
|–|	Subtraction | 3 – 2 results in 1
|*|	Multiplication | 2 * 3 results in 6
|/|	Division | 6 / 2 results in 3|

Numeric operators are just one type of operator available to you. 4D supports many different types of data, such as numbers, text, dates, and pictures, so there are operators that perform operations on these different data types.

The same symbols are often used for different operations, depending on the data type. For example, the plus sign (+) performs different operations with different data:

|Data Type	|Operation|	Example  
|---|---|---
|Number|	Addition	|1 + 2 adds the numbers and results in 3
String	|Concatenation	|“Hello ” + “there” concatenates (joins together) the strings and results in “Hello there”
Date and Number	|Date addition	|!1989-01-01! + 20 adds 20 days to the date January 1, 1989, and results in the date January 21, 1989|

The operators are fully defined in the chapter Operators and its subsections.


## Expressions 

Simply put, expressions return a value. In fact, when using the 4D language, you use expressions all the time and tend to think of them only in terms of the value they represent. Expressions are also sometimes referred to as formulas.

Expressions are made up of almost all the other parts of the language: commands, operators, variables, fields, object properties, and collection elements. You use expressions to build statements (lines of code), which in turn are used to build methods. The language uses expressions wherever it needs a piece of data.

Expressions rarely “stand alone.” There are several places in 4D where an expression can be used by itself. It includes:

- Formula editor (apply formula, query with formula, order by formula)
- The `EXECUTE FORMULA` command
- The Property list, where an expression can be used as a data source for most of widgets
- Debugger where the value of expressions can be checked
- Quick Report editor as a formula for a column


### Assignable vs non-assignable expressions

An expression can simply be a constant, such as the number 4 or the string “Hello.” It can also use operators. For example, 4 + 2 is an expression that uses the addition operator to add two numbers together and return the result 6. In any cases, these expressions are **non-assignable**, which means that you cannot assign a value to them.
In 4D, expressions can be **assignable**. An expression is assignable when it can be used on the right side of an assignation. For example:
```
Form.pageNumber := 10 //assignable
Form.pageTotal-Form.pageNumber := 10 //error, non-assignable
```
In general, expressions that use an operator are non-assignable. For example, `[Person]FirstName" "+[Person]LastName` is not assignable. ORDA entities accessed through their position in an entity selection use the [ ] opertor, they are also non assignable:
```
entitySel[1].name:="Smith" //error
entitySel[1].lock() // error
```

### Expression types
You refer to an expression by the data type it returns. There are several expression types. The following table gives examples of each type of expression.

|Expression|Type|Description|
|---|---|---|
|“Hello”|String	|The word Hello is a string constant, indicated by the double quotation marks.|
|“Hello ” + “there”|	String|	Two strings, “Hello ” and “there”, are added together (concatenated) with the string concatenation operator (+). The string “Hello there” is returned.|
|“Mr. ” + [People]Name|	String|	Two strings are concatenated: the string “Mr. ” and the current value of the Name field in the People table. If the field contains “Smith”, the expression returns “Mr. Smith”.|
|(“smith”)	|String	T|his expression uses , a command from the language, to convert the string “smith” to uppercase. It returns “SMITH”.|
|4	|Number |	This is a number constant, 4.|
|4 * 2|	Number|	Two numbers, 4 and 2, are multiplied using the multiplication operator (*). The result is the number 8.|
|My Button	|Number|	This is the name of a button. It returns the current value of the button:1 if it was clicked, 0 if not.|
!1997-01-25!|	Date|	This is a date constant for the date 1/25/97 (January 25, 1997).|
|Current date+ 30|	Date	|This is a date expression that uses the command to get today’s date. It adds 30 days to today’s date and returns the new date.|
|?8:05:30?	|Time|	This is a time constant that represents 8 hours, 5 minutes, and 30 seconds.|
|?2:03:04? + ?1:02:03?	|Time	|This expression adds two times together and returns the time 3:05:07.|
|True|	Boolean|	This command returns the Boolean value TRUE.|
|10 # 20|Boolean	|This is a logical comparison between two numbers. The number sign (#) means “is not equal to”. Since 10 “is not equal to” 20, the expression returns TRUE.|
|“ABC” = “XYZ”	|Boolean	|This is a logical comparison between two strings. They are not equal, so the expression returns FALSE.|
|My Picture + 50	|Picture	|This expression takes the picture in My Picture, moves it 50 pixels to the right, and returns the resulting picture.|
|->[People]Name	|Pointer	|This expression returns a pointer to the field called [People]Name.|
|Table (1)|	Pointer	|This is a command that returns a pointer to the first table.|
|JSON Parse (MyString)|	Object|	This is a command that returns MyString as an object (if proper format)|
|JSON Parse (MyJSONArray)	|Collection	|This is a command that returns MyJSONArray as a collection (if proper format)|
|Form.pageNumber|Object property|An object property is an expression that can be of any supported type
|Col[5]|Collection element|A collection element is an expression that can be of any supported type|


## Methods

In order to make the commands, operators, and other parts of the language work, you put them in methods. There are several kinds of methods: Object methods, Form methods, Table methods (Triggers), Project methods, and Database methods.

**Note:** In 4D, "methods" also designate commands that must be invoked on objects or collections. They are called "instance methods". For example, `entity.save()` or `collection.sort()` are instance methods.

A method is composed of statements; each statement consists of one line in the method. A statement performs an action, and may be simple or complex.

For example, the following line is a statement that will display a confirmation dialog box:

```
CONFIRM("Do you really want to close this account?";"Yes";"No")
```

A method also contains tests and loops that control the flow of the execution. 4D methods support `If...Else...End if` and `Case of...Else...End case` branching structures as well as looping structures: `While...End while`, `Repeat...Until`, `For...End for`, and `For each...End for each`:

The following example goes through all the characters of the text vtSomeText:

```
For($vlChar;1;Length(vtSomeText))
  //Do something with the character if it is a TAB
    If(Character code(vtSomeText[[$vlChar]])=Tab)
  //...
    End if
 End for
```

A project method can call another project method with or without parameters (arguments). The parameters are passed to the method in parentheses, following the name of the method. Each parameter is separated from the next by a semicolon (;). The parameters are available within the called method as consecutively numbered local variables: $1, $2,…, $n. A method can return a single value in the $0 parameter. When you call a method, you just type its name:

```
$myText:="hello"
$myText:=Do_Something($myText) //Call the Do_Something method
ALERT($myText) //"HELLO"
 
  //Here the code of the method Do_Something
$0:=Uppercase($1)
```
 
## Pointers

The 4D language provides an advanced implementation of pointers, that allow writing powerful and modular code. You can use pointers to reference tables, fields, variables, arrays, and array elements.

A pointer to an element is created by adding a "->" symbol before the element name, and can be dereferenced by adding the "->" symbol after the pointer name.

```
MyVar:="Hello"
MyPointer:=->MyVar
ALERT(MyPointer->)
```
