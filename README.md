
# 🌐 ArmoryNodeWebsite
My website 😀

## 🪟 Overview
This repository contains the source code for my website. It's currently very minimal, but I plan on adding more stuff to it. I ported this from standard HTML/CSS/JS mainly as a way to learn how to write Elm, in hopes to advance my knowledge of functional programming.

## 🛠️ Technology Used
[![Elm](https://img.shields.io/badge/Elm-60B5CC?style=for-the-badge&logo=elm&logoColor=white)](https://elm-lang.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)<br>
[![Deno](https://img.shields.io/badge/Deno-000000?style=for-the-badge&logo=deno&logoColor=white)](https://deno.com/)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-F38020?style=for-the-badge&logo=cloudflarepages&logoColor=white)](https://pages.cloudflare.com/)

## 👷‍♂️ Getting Started
Since this is my personal website, I don't really expect anyone to want to run it locally, but if you do, these are the steps you'll need to take.

### Prerequisites

- Elm (https://elm-lang.org/)
- Deno (https://deno.com/)
- Node.js (https://nodejs.org/en) (This is only required until [this bug is fixed](https://github.com/denoland/deno/issues/26349))

### Building
1. Clone the repository
```bash
git clone https://github.com/armorynode/ArmoryNodeWebsite.git
cd ArmoryNodeWebsite
```

2. Build and run the project
```bash
# Use this command to build and run the project
deno task run

# On first run it will ask you to install wrangler (if you don't already have it).
# Just hit enter to continue, this will only need to be done once.
Need to install the following packages:
wrangler@x.x.x
Ok to proceed? (y)
```

The website should now be running at `http://localhost:8787`
<br>
*Note: If the port is in use, change the `port` setting in `wrangler.toml` under `[dev]` to any other open port.*

## 🪪 License
> Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
>
>    http://www.apache.org/licenses/LICENSE-2.0
>
> Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
