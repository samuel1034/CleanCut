# CleanCut - Instant AI Background Remover

CleanCut is a modern, web-based application that allows users to instantly remove the background from any image using the power of generative AI. Simply upload your image, and CleanCut will automatically detect the subject and remove the background, providing you with a high-quality, transparent image ready for download.


## ✨ Features

- **AI-Powered Background Removal**: Leverages Google's Gemini model via Genkit for fast and accurate background removal.
- **Interactive Image Comparison**: Easily compare the original and processed images with a draggable slider.
- **Drag & Drop Upload**: A user-friendly interface for uploading images.
- **Downloadable Results**: Download the processed image with a transparent background in HD.
- **Responsive Design**: A seamless experience across desktop and mobile devices.
- **Built with Modern Tech**: Fast, reliable, and scalable, built on the latest web technologies.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Generative AI**: [Google Genkit](https://firebase.google.com/docs/genkit) with Gemini
- **Deployment**: Configured for [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <YOUR_REPO_URL>
    cd <REPO_DIRECTORY>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env` in the root of your project and add your Google AI API key:
    ```env
    GOOGLE_API_KEY="your_google_api_key_here"
    ```
    You can obtain a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

4.  **Run the development server:**
    The application requires two processes to run concurrently: the Next.js frontend and the Genkit AI flows. You will need to open two separate terminal windows.

    - **Terminal 1: Start the Genkit flows:**
      ```bash
      npm run genkit:watch
      ```
      This starts the Genkit development server, making the AI flows available to your app.

    - **Terminal 2: Start the Next.js app:**
      ```bash
      npm run dev
      ```
      This will start the frontend on `http://localhost:9002`.

Now you can open [http://localhost:9002](http://localhost:9002) in your browser to see the application.
