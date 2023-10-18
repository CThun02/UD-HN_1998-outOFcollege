package com.fpoly.ooc.service.impl;

import jakarta.servlet.ServletContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class FileMangerService {
    @Autowired
    ServletContext context;

    private Path getPath(String folder, String fileName){
        File dir = Paths.get(context.getContextPath(), "images/products/"+folder).toFile();
        if(!dir.exists()){
            dir.mkdirs();
        }
        return Paths.get(dir.getAbsolutePath(), fileName);
    }

    public byte[] read(String folder, String fileName){
        Path path = this.getPath(folder, fileName);
        try {
            return Files.readAllBytes(path);
        } catch (IOException e) {
            e.printStackTrace();
            return new byte[0];
        }
    }

    public List<String> save(String folder, MultipartFile[] files){
        List<String> fileNames = new ArrayList<>();
        for (MultipartFile file: files) {
            String name = System.currentTimeMillis() + file.getOriginalFilename();
            String fileName = Integer.toHexString(name.hashCode()) + name.substring(name.lastIndexOf("."));
            Path path = this.getPath(folder, fileName);
            try{
                file.transferTo(path);
                fileNames.add(fileName);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return fileNames;
    }

    public void delete(String folder, String fileName){
        Path path = this.getPath(folder, fileName);
        path.toFile().delete();
    }

    public List<String> list(String folder){
        File dir = Paths.get(context.getContextPath(), "images/products/"+folder).toFile();
        List<String> list = new ArrayList<>();
        if(dir.exists()){
            File files[] = dir.listFiles();
            list = Arrays.stream(files).map(file -> file.getName()).toList();
        }
        return list;
    }
}
