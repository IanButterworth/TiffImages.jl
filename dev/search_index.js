var documenterSearchIndex = {"docs":
[{"location":"lib/extend/tags/#Built-in-Tags","page":"Built-in Tags","title":"Built-in Tags","text":"","category":"section"},{"location":"lib/extend/tags/","page":"Built-in Tags","title":"Built-in Tags","text":"TIFF.TiffTag","category":"page"},{"location":"lib/extend/tags/#TIFF.TiffTag","page":"Built-in Tags","title":"TIFF.TiffTag","text":"primitive type TiffTag <: Enum{Int32} 32\n\nList of many common named TIFF Tags. This is not an exhaustive list but should cover most cases.\n\n\n\n\n\n","category":"type"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"EditURL = \"https://github.com/tlnagy/TIFF.jl/blob/master/examples/writing.jl\"","category":"page"},{"location":"generated/writing/#Writing-TIFFs","page":"Writing TIFFs","title":"Writing TIFFs","text":"","category":"section"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"This page is a tutorial for saving TIFFs using TIFF.jl and covers some common use cases","category":"page"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"Pages = [\"writing.md\"]\nDepth = 5","category":"page"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"You might want to write TIFFs to disk too. Now this can be done quite simply with TIFF.jl. Say you have some AbstractArray type that you want to save, here we'll call it data:","category":"page"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"using Random\nusing Images # for nice inline images\n\nRandom.seed!(123)\ndata = rand(RGB{N0f8}, 10, 10)","category":"page"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"note: Note\nTIFF.jl only works with AbstractArrays with eltypes of <:Colorant because the writer needs to know how to represent the image data on disk. Make sure to convert your AbstractArrays using before passing them. See the common strategies section below for tips.","category":"page"},{"location":"generated/writing/#Converting-to-TIFF.jl's-TIFF-type","page":"Writing TIFFs","title":"Converting to TIFF.jl's TIFF type","text":"","category":"section"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"Next lets convert data to a TIFF type","category":"page"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"using TIFF\nimg = TIFF.DenseTaggedImage(data)","category":"page"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"Wait nothing happened! Hang with me, lets take a closer look at our new object using the dump command. We can see that there's now new information associated with our data! TIFF.jl usually represents TIFF images as simply the data and associated tags that describe the data","category":"page"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"dump(img; maxdepth=1)","category":"page"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"The tags are organized as a vector of what are called Image File Directories (IFDs). For a simple 2D image like what we have, the IFDs will be stored a vector of length=1. For 3D images, the length of the IFDs vector will equal the length of the image in the third dimension.","category":"page"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"Lets take a look at what tags there are:","category":"page"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"ifd = first(img.ifds) # since our data is 2D\nifd","category":"page"},{"location":"generated/writing/#Manipulating-TIFF-Tags","page":"Writing TIFFs","title":"Manipulating TIFF Tags","text":"","category":"section"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"These are some of the most basic tags that are required by the TIFF spec. We can even update it to add our own custom tags","category":"page"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"ifd[TIFF.IMAGEDESCRIPTION] = \"This is very important data\"\nifd","category":"page"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"We can even add tags that aren't in the standard set in TIFF.TiffTag as long as they are a UInt16","category":"page"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"ifd[UInt16(34735)] = UInt16[1, 2, 3]\nifd","category":"page"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"We can also delete tags if we decide we don't want them:","category":"page"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"delete!(ifd, TIFF.IMAGEDESCRIPTION)\nifd","category":"page"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"warning: Warning\nCareful with delete!, if any of core tags are deleted, TIFF.jl and other readers might fail to read the file","category":"page"},{"location":"generated/writing/#Saving-to-disk","page":"Writing TIFFs","title":"Saving to disk","text":"","category":"section"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"Once you're happy with your TIFF object, you can write it to disk as follows:","category":"page"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"open(\"test.tif\", \"w\") do io\n    write(io, img)\nend","category":"page"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"And to just double check, we can load it right back in","category":"page"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"TIFF.load(\"test.tif\")","category":"page"},{"location":"generated/writing/#Strategies-for-saving-common-types","page":"Writing TIFFs","title":"Strategies for saving common types","text":"","category":"section"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"The general strategy for saving arrays will differ a bit depending on the type. The key step is the convert or reinterpret the arrays so that the elements are subtypes of Colors.Colorant","category":"page"},{"location":"generated/writing/#Unsigned-Integers","page":"Writing TIFFs","title":"Unsigned Integers","text":"","category":"section"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"Say you want to save a 3D array of small integers as grayscale values.","category":"page"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"data2 = rand(UInt8.(1:255), 5, 10)\neltype(data2)","category":"page"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"You can't directly save the data2 since TIFF.jl needs some color information to properly save the file. You can use reinterpret to accomplish this:","category":"page"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"grays = reinterpret(Gray{N0f8}, data2)\nimg2 = TIFF.DenseTaggedImage(grays)","category":"page"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"Here the data are first reinterpreted as N0f8s, which is a FixedPointNumber then wrapped with a Gray type that marks this as a grayscale image. TIFF.jl uses this information to update the TIFF tags","category":"page"},{"location":"generated/writing/#Floating-point-numbers","page":"Writing TIFFs","title":"Floating point numbers","text":"","category":"section"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"With RGB we can reinterpret the first dimension of a 3D array as the 3 different color components (red, green, and blue):","category":"page"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"data = rand(Float64, 3, 5, 10);\ncolors = dropdims(reinterpret(RGB{eltype(data)}, data), dims=1) # drop first dimension\nimg3 = TIFF.DenseTaggedImage(colors)","category":"page"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"Here we dropped the first dimension since it was collapsed into the RGB type when we ran the reinterpret command.","category":"page"},{"location":"generated/writing/#Signed-integers","page":"Writing TIFFs","title":"Signed integers","text":"","category":"section"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"Say you want to save data that has negative integer values. In that case, you can't use N0f8, etc because those only worked for unsigned integers. You have to instead use Q0f63, etc, which is a different kind of fixed point number that uses one bit for the sign info (that's why it's Q0f63, not Q0f64!)","category":"page"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"data = rand(-100:100, 5, 5)","category":"page"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"img4 = TIFF.DenseTaggedImage(reinterpret(Gray{Q0f63}, data))\nprintln(img4.ifds[1])","category":"page"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"As you can see the SAMPLEFORMATS and BITSPERSAMPLE tags correctly updated to show that this TIFF contains signed integers and 64-bit data, respectively.","category":"page"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"warning: Warning\nCurrently, several of the display libraries struggle with showing Colorants backed by a signed type so you might run into errors, but the data will still save properly","category":"page"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"","category":"page"},{"location":"generated/writing/","page":"Writing TIFFs","title":"Writing TIFFs","text":"This page was generated using Literate.jl.","category":"page"},{"location":"contributing/#Contributing","page":"Contributing","title":"Contributing","text":"","category":"section"},{"location":"contributing/","page":"Contributing","title":"Contributing","text":"Supporting all TIFFs is non-trivial and I would greatly appreciate any help from the community in identifying edge cases.","category":"page"},{"location":"contributing/#Add-edge-case-TIFFs","page":"Contributing","title":"Add edge case TIFFs","text":"","category":"section"},{"location":"contributing/","page":"Contributing","title":"Contributing","text":"There is incredible diversity in the TIFF ecosystem so much so that there is a backronym \"Thousand Incompatible File Formats\" to describe it. I have tried to establish a good baseline test set of TIFFs that should guarantee that TIFF.jl should \"just work tm\" for most people, but if you have a TIFF that you run into that breaks TIFF.jl please do the following:","category":"page"},{"location":"contributing/","page":"Contributing","title":"Contributing","text":"create a pull request against the  example TIFF repo adding the file. The smaller the file, the better.\nupdate the README table with license information, etc.\nOpen an issue against TIFF.jl with the error message and the expected result","category":"page"},{"location":"lib/extend/#Extending-TIFF.jl","page":"Overview","title":"Extending TIFF.jl","text":"","category":"section"},{"location":"lib/extend/","page":"Overview","title":"Overview","text":"If you want to extend TIFF.jl to add support for more features or change how TIFF data is loaded, you have come to right place.","category":"page"},{"location":"lib/extend/","page":"Overview","title":"Overview","text":"TIFF.Tag","category":"page"},{"location":"lib/extend/#TIFF.Tag","page":"Overview","title":"TIFF.Tag","text":"struct Tag{O<:Unsigned}\n\ntag\ndatatype\ncount\ndata\nloaded\n\n\n\n\n\n","category":"type"},{"location":"lib/public/#Public-interface","page":"Public","title":"Public interface","text":"","category":"section"},{"location":"lib/public/","page":"Public","title":"Public","text":"WIP","category":"page"},{"location":"#TIFF.jl","page":"Home","title":"TIFF.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Pure-Julia TIFF reader and writer with a focus on correctness 🧐","category":"page"},{"location":"","page":"Home","title":"Home","text":"TIFF (Tagged Image File Format) is a notoriously flexible file format that is very difficult to support properly so why not just link libtiff and call it a day? Because Julia developers are greedy. I wanted to design a clean, minimal, and standards-compliant TIFF reader and writer that can have the speed and compliance of libtiff while adding modern features like streaming, out-of-memory support, and fancy color support. I wanted to design it to be extensible such that packages like OMETIFF.jl can hook right in with minimal overhead. I wanted to leverage the wonderful Julia Arrays ecosystem to do as much lazily and flexibly as possible.","category":"page"},{"location":"#Features","page":"Home","title":"Features","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"TIFF.jl supports:","category":"page"},{"location":"","page":"Home","title":"Home","text":"[x] The TIFF 6.0 baseline spec\n[x] Thorough testing\n[x] HDR images stored as 32bit or 64bit floats\n[x] BigTIFFs\n[ ] Out-of-memory support (WIP)\n[ ] Streaming from disk (WIP)","category":"page"}]
}
