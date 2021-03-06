---
id: parameters
title: Parameters
---


## Using parameters

You'll often find that you need to pass data to your methods. This is easily done with parameters.

**Parameters** (or **arguments**) are pieces of data that a method needs in order to perform its task. The terms *parameter* and *argument* are used interchangeably throughout this manual. Parameters are also passed to built-in 4D commands. In this example, the string “Hello” is an argument to the `ALERT` built-in command:

```
ALERT("Hello")
```

Parameters are passed to methods in the same way. For example, if a project method named DO SOMETHING accepted three parameters, a call to the method might look like this:

```
DO SOMETHING(WithThis;AndThat;ThisWay)
```
The parameters are separated by semicolons (;).

In the subroutine (the method that is called), the value of each parameter is automatically copied into sequentially numbered local variables: $1, $2, $3, and so on. The numbering of the local variables represents the order of the parameters.

```
  //Code of the method DO SOMETHING
  //Assuming all parameters are of the text type
 C_TEXT($1;$2;$3)
 ALERT("I received "+$1+" and "+$2+" and also "+$3)
  //$1 contains the WithThis parameter
  //$2 contains the AndThat parameter
  //$3 contains the ThisWay parameter
```

Within the subroutine, you can use the parameters $1, $2... in the same way you would use any other local variable. However, in the case where you use commands that modify the value of the variable passed as parameter (for example `Find in field`), the parameters $1, $2, and so on cannot be used directly. You must first copy them into standard local variables (for example: `$myvar:=$1`).

The same principles are used when methods are executed through dedicated  commands, for example:

```
EXECUTE METHOD IN SUBFORM("Cal2";"SetCalendarDate";*;!05/05/10!)  
//pass the !05/05/10! date as parameter to the SetCalendarDate  
// in the context of a subform
```

**Note:** For a good execution of code, you need to make sure that all `$1`, `$2`... parameters are correctly declared within called methods (see [Declaring parameters](#declaring-parameters) below).


## Functions 

Data can be returned from methods. A method that returns a value is called a function.

4D or 4D Plug-in commands that return a value are also called functions.

For example, the following line is a statement that uses the built-in function, `Length`, to return the length of a string. The statement puts the value returned by `Length` in a variable called *MyLength*. Here is the statement:

```
MyLength:=Length("How did I get here?")
```

Any subroutine can return a value. The value to be returned is put into the local variable `$0`.

For example, the following function, called `Uppercase4`, returns a string with the first four characters of the string passed to it in uppercase:

```
$0:=Uppercase(Substring($1;1;4))+Substring($1;5)
```

The following is an example that uses the Uppercase4 function:

```
 NewPhrase:=Uppercase4("This is good.")
```

In this example, the variable *NewPhrase* gets “THIS is good.”

The function result, `$0`, is a local variable within the subroutine. It can be used as such within the subroutine. For example, in the previous `DO SOMETHING` example, `$0` was first assigned the value of `$1`, then used as parameter to the `ALERT` command. Within the subroutine, you can use `$0` in the same way you would use any other local variable. It is 4D that returns the value of `$0` (as it is when the subroutine ends) to the called method.


## Declaring parameters

Even if it not mandatory in [interpreted mode](Concepts/interpreted.md), you must declare each parameter in the called methods to prevent any trouble. 

In the following example, the `OneMethodAmongOthers` project method declares three parameters:

```
  // OneMethodAmongOthers Project Method
  // OneMethodAmongOthers ( Real ; Date { ; Long } )
  // OneMethodAmongOthers ( Amount ; Date { ; Ratio } )
 
 C_REAL($1) // 1st parameter is of type Real
 C_DATE($2) // 2nd parameter is of type Date
 C_LONGINT($3) // 3rd parameter is of type Long Integer
```

In the following example, the `Capitalize` project method accepts a text parameter and returns a text result:

```
  // Capitalize Project Method
  // Capitalize ( Text ) -> Text
  // Capitalize ( Source string ) -> Capitalized string
 
 C_TEXT($0;$1)
 $0:=Uppercase(Substring($1;1;1))+Lowercase(Substring($1;2))
```

Using commands such as `New process` with process methods that accept parameters also require that parameters are explicitely declared in the called method. For example:

```
C_TEXT($string)
C_LONGINT($idProc;$int)
C_OBJECT($obj)

$idProc:=New process("foo_method";0;"foo_process";$string;$int;$obj)
```

This code can be executed in compiled mode only if "foo_method" declares its parameters:

```
//foo_method
C_TEXT($1)
C_LONGINT($2)
C_OBJECT($3)
...
```

**Note:** For compiled mode, you can group all local variable parameters for project methods in a specific method with a name starting with "Compiler". Within this method, you can predeclare the parameters for each method, for example:
```
 C_REAL(OneMethodAmongOthers;$1) 
```  
See [Interpreted and compiled modes](Concepts/interpreted.md) page for more information.

Parameter declaration is also mandatory in the following contexts (these contexts do not support declaration in a "Compiler" method):

- Database methods
For example, the `On Web Connection Database Method` receives six parameters, $1 to $6, of the data type Text. At the beginning of the database method, you must write (even if all parameters are not used):

```
// On Web Connection
C_TEXT($1;$2;$3;$4;$5;$6)
```

- Triggers
The $0 parameter (Longint), which is the result of a trigger, will be typed by the compiler if the parameter has not been explicitly declared. Nevertheless, if you want to declare it, you must do so in the trigger itself.

- Form objects that accept the `On Drag Over` form event
The $0 parameter (Longint), which is the result of the `On Drag Over` form event, is typed by the compiler if the parameter has not been explicitly declared. Nevertheless, if you want to decalre it, you must do so in the object method.
**Note:** The compiler does not initialize the $0 parameter. So, as soon as you use the `On Drag Over` form event, you must initialize $0. For example:
```
 C_LONGINT($0)
 If(Form event=On Drag Over)
    $0:=0
    ...
    If($DataType=Is picture)
       $0:=-1
    End if
    ...
 End if
```

## Parameter indirection

4D project methods accept a variable number of parameters of the same type, starting from the right. This principle is called **parameter indirection**. Using the `Count parameters` command you can then address those parameters with a `For...End for` loop and the parameter indirection syntax.

In the following example, the project method `SEND PACKETS` accepts a time parameter followed by a variable number of text parameters:

```
  //SEND PACKETS Project Method
  //SEND PACKETS ( Time ; Text { ; Text2... ; TextN } )
  //SEND PACKETS ( docRef ; Data { ; Data2... ; DataN } )
 
 C_TIME($1)
 C_TEXT(${2})
 C_LONGINT($vlPacket)
 
 For($vlPacket;2;Count parameters)
    SEND PACKET($1;${$vlPacket})
 End for
```

Parameter indirection is best managed if you respect the following convention: if only some of the parameters are addressed by indirection, they should be passed after the others. Within the method, an indirection address is formatted: ${$i}, where $i is a numeric variable. ${$i} is called a **generic parameter**. 

For example, consider a function that adds values and returns the sum formatted according to a format that is passed as a parameter. Each time this method is called, the number of values to be added may vary. We must pass the values as parameters to the method and the format in the form of a character string. The number of values can vary from call to call.

This function is called in the following manner:

```
 Result:=MySum("##0.00";125,2;33,5;24)

```

In this case, the calling method will get the string “182.70”, which is the sum of the numbers, formatted as specified. The function's parameters must be passed in the correct order: first the format and then the values.

Here is the function, named `MySum`:
```
 $Sum:=0
 For($i;2;Count parameters)
    $Sum:=$Sum+${$i}
 End for
 $0:=String($Sum;$1)
```

This function can now be called in various ways:

```
 Result:=MySum("##0.00";125,2;33,5;24)
 Result:=MySum("000";1;18;4;23;17)
```


### Declaring generic parameters

As with other local variables, it is not mandatory to declare generic parameters by compiler directive. However, it is recommended to avoid any ambiguity. To declare these parameters, you use a compiler directive to which you pass ${N} as a parameter, where N specifies the first parameter .

Example:
For example, the declaration `C_LONGINT(${5})` tells 4D and the compiler that . 


```
 C_LONGINT(${4})
```

This command means that starting with the fourth  parameter (included), the method can receive a variable number of parameters of longint type. $1, $2 and $3 can be of any data type. However, if you use $2 by indirection, the data type used will be the generic type. Thus, it will be of the data type Longint, even if for you it was, for instance, of the data type Real.

**Note:** The number in the declaration has to be a constant and not a variable.


## Passing mode

Depending on their type, parameters are passed **by copy** or **by reference**:

- When a parameter is passed by copy, the local variables/parameters are not the actual fields, variables, or expressions passed by the calling method; they only contain the values that have been passed. Since its scope is local, if the value of a parameter is modified in the subroutine, it does not change the value in the calling method.
- When a parameter is passed by reference, the local variables/parameters contain references that point to the actual source fields, variables, or expressions passed by the calling method; modifiying the value of the local parameter will modify the source value.

The following table shows how the different types of elements can be passed:

|Type of parameter|How passed|Comment|
|---|---|---|
|Field, variable or expression of a scalar type (number, text, date...)|	by copy|Can be passed by reference through a pointer, see below|
|Field, variable or expression of type Object|by reference|See example below|
|Variable or expression of type Collection|by reference|
|Variable or expression of type Pointer|by reference|See Passing Pointers to Methods|
|Array|Cannot be passed directly as parameter|Can be passed by reference through a pointer, see Arrays and Pointers|
|Table|Cannot be passed directly as parameter|Can be passed by reference through a pointer, see Pointers|

### Parameters passed by copy

When using fields, variables and expressions of the scalar type as method parameters, only copies of values are passed.

Since `$1, $2...` are local variables, they are available only within the subroutine and are cleared at the end of the subroutine. For this reason, a subroutine cannot change the value of the actual fields or variables passed as parameters at the calling method level. For example:

```
  ` Here is some code from the method MY METHOD
  ` ...
 DO SOMETHING([People]Last Name) ` Let's say [People]Last Name is equal to "williams"
 ALERT([People]Last Name)
 
  ` Here is the code of the method DO SOMETHING
 $1:=Uppercase($1)
 ALERT($1)
```

The alert box displayed by `DO SOMETHING` will read "WILLIAMS" and the alert box displayed by `MY METHOD` will read "williams". The method locally changed the value of the parameter $1, but this does not affect the value of the field `[People]Last Name` passed as parameter by the method `MY METHOD`.

There are two ways to make the method `DO SOMETHING` change the value of the field:

1. Rather than passing the field to the method, you pass a pointer to it, so you would write:

```
  ` Here is some code from the method MY METHOD
  ` ...
 DO SOMETHING(->[People]Last Name) ` Let's say [People]Last Name is equal to "williams"
 ALERT([People]Last Name)
 
  ` Here the code of the method DO SOMETHING
 $1->:=Uppercase($1->)
 ALERT($1->)
```

Here the parameter is not the field, but a pointer to it. Therefore, within the `DO SOMETHING` method, $1 is no longer the value of the field but a pointer to the field. The object **referenced** by $1 ($1-> in the code above) is the actual field. Consequently, changing the referenced object goes beyond the scope of the subroutine, and the actual field is affected. In this example, both alert boxes will read "WILLIAMS".

2. Rather than having the method `DO SOMETHING` "doing something," you can rewrite the method so it returns a value. Thus you would write:

```
  ` Here is some code from the method MY METHOD
  ` ...
 [People]Last Name:=DO SOMETHING([People]Last Name) ` Let's say [People]Last Name is equal to "williams"
 ALERT([People]Last Name)
  ` Here the code of the method DO SOMETHING
 $0:=Uppercase($1)
 ALERT($0)
```

This second technique of returning a value by a subroutine is called “using a function.” This is described in the next paragraphs.

### Parameters passed by reference

With certain value types, references to actual source values are passed as *parameters*, and not values themselves. This is the case with variables, expressions, or fields of the Object or Collection type, as well as pointer expressions. In this case, `$1, $2...` do not contain values but references. Modifying the value of the `$1, $2...` parameters within the subroutine will be propagated wherever the source object or collection is used. This is the same principle as for pointers, except that `$1, $2...` parameters do not need to be dereferenced in the subroutine.

For example:

```
  //The CreatePerson method creates an object and sends it as a parameter
 C_OBJECT($person)
 $person:=New object("Name";"Smith";"Age";40)
 ChangeAge($person)
 ALERT(String(OB get($person;"Age")))

  //The ChangeAge method adds 10 to the Age attribute of the received object
 C_OBJECT($1)
 OB SET($1;"Age";OB Get($1;"Age")+10)
 ALERT(String(OB get($1;"Age")))
```

If you execute the `CreatePerson` method, both alert boxes will read "50" since the same reference is handled by both methods.

**4D Server:** When parameters are passed between methods that are not executed on the same machine (using for example the "Execute on Server" option), references are not usable. In these cases, copies of object and collection parameters are sent instead of references.
