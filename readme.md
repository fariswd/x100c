# x100c 
Get x100c log with nodejs

## Model XML
```xml
<GetAttLogResponse>
    <Row>
        <PIN>99</PIN>
        <DateTime>2019-07-01 08:53:33</DateTime>
        <Verified>0</Verified>
        <Status>0</Status>
        <WorkCode>0</WorkCode>
    </Row>
    <Row>
        <PIN>99</PIN>
        <DateTime>2019-07-01 17:23:41</DateTime>
        <Verified>1</Verified>
        <Status>0</Status>
        <WorkCode>0</WorkCode>
    </Row>
    <Row>
        <PIN>3</PIN>
        <DateTime>2019-07-01 18:44:26</DateTime>
        <Verified>1</Verified>
        <Status>0</Status>
        <WorkCode>0</WorkCode>
    </Row>
</GetAttLogResponse>
```

## Parsed JSON by date
```js
{
  2019-07-01: {
    3: [
      {
        PIN: "3",
        DateTime: "2019-07-01 18:44:26",
        Verified: "1",
        Status: "0",
        WorkCode: "0"
      }
    ],
    99: [
      {
        PIN: "99",
        DateTime: "2019-07-01 08:53:33",
        Verified: "0",
        Status: "0",
        WorkCode: "0"
      },
      {
        PIN: "99",
        DateTime: "2019-07-01 17:23:41",
        Verified: "0",
        Status: "0",
        WorkCode: "0"
      }
    ]
  }
],
```


## Use ?
```
npm install
FILL_YOURS on index.js
node index.js
hit GET localhost:3001
```

## Use Dummy?
```
node dummy.js
node index.js
hit GET localhost:3001/dummy
```

fariswd  
2020  
:alarm_clock::alarm_clock::alarm_clock:  
