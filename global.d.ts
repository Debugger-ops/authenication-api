// global.d.ts
declare global {
    namespace NodeJS {
      interface Global {
        mongoose: any; // Or use 'mongoose.Mongoose' for stricter typing
      }
    }
  }
  
  // This ensures that this file is treated as a module
  export {};
  