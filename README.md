# Bugedex

## About

Once you start up the application you will find yourself at http://localhost:4200/bugs.

There will be a list of bugs from Animal Crossing, so cute. However my bugEdex is a little broken, so it only shows bugs that are around All Day.

When you select a bug, you will be redirected to http://localhost:4200/bug?name={{selected bug name}} and the information for that bug will be presented.

Back on the main bugs page, you can also click a checkmark to indicate if you have caught the bug or not. When checking out the details of any of the bugs, your caught status will also appear with a checkbox.

## API

Example of the response object from the API

```json
 {
        "name": "Common Butterfly",
        "location": "Flying",
        "time": "4 AM - 7 PM",
        "price": 160,
        "month": {
            "north": [
                1,
                2,
                3,
                4,
                5,
                6,
                9,
                10,
                11,
                12
            ],
            "south": [
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12
            ]
        }
    }
```


### Future potential Addtions

- images for the bug details page - pexels
- formgroups for the details page
- GitHub Readme decoration
- Make a MaterialCommonModule
- Conditional or ? for Bug Details
- Implement a timeout in bug data service



## Project Information

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).



