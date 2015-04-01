Data Aggregation & Analysis System for Intelligent Agriculture
==================

## Background
This work is being done to satisfy the requirements of the [first CSci 5221 programming project][assignment] (Spring 2015 class) by the following team members:

* Panagiotis Stanitsas (stani078)
* Nabil Cheikh (cheik004)
* Jacob Quant (quant006)

[assignment]: http://www-users.cselabs.umn.edu/classes/Spring-2015/csci5221/Project1/csci5221s15-project1-handout.pdf

## Proposal
A copy of the proposal we submitted can be found [in docs/proposal.txt](docs/proposal.txt).
It should also be available [on the class project website](https://sites.google.com/a/umn.edu/csci5221s15/project-1-proposals-and-reports/data-aggregation-analysis-system-for-intelligent-agriculture).

## Design
Here are links to the [design document](docs/design/Design%20Document.pdf)
and [execution plan](docs/design/Execution%20Plan.pdf).

## Server operations

| HTTP Method | Path       | Description                                                                              |
|-------------|------------|------------------------------------------------------------------------------------------|
| `GET`       | `/`        | Simple sanity checks that server is responding                                           |
| `GET`       | `/db_stats`| Shows how many items are in each MongoDB collection                                      |
| `GET`       | `/version` | Attempts to run `git pull` to update the code from github then shows SHA for HEAD commit |
| `POST`      | `/collect` | Store the measurement data from the body of the request inthe database                   |
| `GET`       | `/ws`      | Used by client application to upgrade to WebSockets connection                           |

