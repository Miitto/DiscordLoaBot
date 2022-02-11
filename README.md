A small Discord Bot to handle an improved leave of absence system for an Arma III Unit

## **Usage**

Creates a / command called *loa* (/loa) which takes a description and a time length in shorthand

> Length Shorthand (Case Independent):  

Day: d  
Week: w  
Month: m  
Year: y  

They can be combined in any order, as long as they have the corresponding number as a prefix, eg `/loa A short Description <tab> 1w4d` creates an LOA request of duration 1 week and 4 days. The tab is used by discord to switch to the next field.

The bot then calculates when the LOA will expire and creates an embed - then shows the user to confirm and sends it to staff for review.
  
  
Currently only for use in the one server, will likely be expanding it to be able to work over multiple servers when I have the time.
