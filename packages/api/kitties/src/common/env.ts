/**
 * @file env.ts
 * @author Ricardo Rius
 * @license GPL-3.0
 *
 * Copyright (C) 2025 Ricardo Rius
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * Browser Environment Layer
 *
 * This file provides browser-only implementations for environment operations.
 * All file system operations throw appropriate errors since they're not available in browsers.
 */

// Environment detection - always browser in this version
export const isNodeEnvironment = false;
export const isBrowserEnvironment = true;

// File System API Abstractions
// All file operations throw errors in browser environment

export const readFile = async (_path: string): Promise<string> => {
  throw new Error('File system access is not available in browser environment');
};

export const writeFile = async (_path: string, _content: string): Promise<void> => {
  throw new Error('File system access is not available in browser environment');
};

export const fileExists = async (_path: string): Promise<boolean> => {
  return false;
};

export const readFileSync = (_path: string, _encoding?: BufferEncoding | { encoding: BufferEncoding } | string): string => {
  return '';
};

export const existsSync = (_path: string): boolean => {
  return false;
};

export const mkdir = async (_path: string, _options?: { recursive?: boolean }): Promise<void> => {
  throw new Error('File system operations are not supported in the browser');
};

// Stream Type Definitions
export interface ReadStream {
  on(event: string, callback: (...args: any[]) => void): ReadStream;
  close(): void;
}

export interface WriteStream {
  write(chunk: string): boolean;
  on(event: string, callback: (...args: any[]) => void): WriteStream;
  end(): void;
}

// Stream Factory Functions - return mock streams that emit errors
export const createReadStream = (_path: string): ReadStream => {
  const stream: ReadStream = {
    on: function (event: string, callback: (...args: any[]) => void): ReadStream {
      if (event === 'error') {
        callback(new Error('File system operations are not supported in the browser'));
      }
      return stream;
    },
    close: function (): void {},
  };
  return stream;
};

export const createWriteStream = (_path: string): WriteStream => {
  const stream: WriteStream = {
    write: function (): boolean {
      return false;
    },
    on: function (event: string, callback: (...args: any[]) => void): WriteStream {
      if (event === 'error') {
        callback(new Error('File system operations are not supported in the browser'));
      }
      return stream;
    },
    end: function (): void {},
  };
  return stream;
};

// File System Constants
export const constants = {
  F_OK: 0, // File exists
  R_OK: 4, // File is readable
  W_OK: 2, // File is writable
  X_OK: 1, // File is executable
};

// Cross-platform path utilities
export interface PathUtils {
  join: (...segments: string[]) => string;
  resolve: (...segments: string[]) => string;
  dirname: (filepath: string) => string;
  basename: (filepath: string) => string;
}

// Browser-compatible path utilities
export const pathUtils: PathUtils = {
  join: (...segments: string[]): string => {
    // Filter out empty segments and join with forward slash
    return segments
      .filter(Boolean)
      .join('/')
      .replace(/\/+/g, '/') // Replace multiple slashes with a single one
      .replace(/\/$/, ''); // Remove trailing slash
  },

  resolve: (...segments: string[]): string => {
    // Start with empty path
    let resolvedPath = '';
    let isAbsolute = false;

    for (const segment of segments) {
      // Skip empty segments
      if (!segment) continue;

      // Handle absolute paths (they reset the result)
      if (segment.startsWith('/')) {
        resolvedPath = segment;
        isAbsolute = true;
        continue;
      }

      // Handle relative paths
      if (resolvedPath) {
        resolvedPath = `${resolvedPath}/${segment}`;
      } else {
        resolvedPath = segment;
      }
    }

    // Clean up the path
    resolvedPath = resolvedPath
      .replace(/\/\.\//g, '/') // Remove /./ sequences
      .replace(/\/+/g, '/'); // Replace multiple slashes

    // Ensure absolute paths start with /
    return isAbsolute ? resolvedPath : resolvedPath;
  },

  dirname: (filepath: string): string => {
    // Handle empty or root paths
    if (!filepath || filepath === '/') return '/';

    // Remove trailing slash if present
    const path = filepath.endsWith('/') ? filepath.slice(0, -1) : filepath;

    const lastSlash = path.lastIndexOf('/');
    // No slashes found
    if (lastSlash === -1) return '.';
    // Return everything before the last slash
    // Special case for root path
    return lastSlash === 0 ? '/' : path.substring(0, lastSlash);
  },

  basename: (filepath: string): string => {
    // Handle empty paths
    if (!filepath) return '';

    // Remove trailing slash if present
    const path = filepath.endsWith('/') ? filepath.slice(0, -1) : filepath;

    const lastSlash = path.lastIndexOf('/');
    return lastSlash === -1 ? path : path.substring(lastSlash + 1);
  },
};
